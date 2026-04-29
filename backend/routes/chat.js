const express = require('express');
const router = express.Router();

function extractChunkText(chunk) {
  if (!chunk) return '';
  if (typeof chunk.text === 'string') return chunk.text;
  if (typeof chunk.text === 'function') {
    try {
      return chunk.text() || '';
    } catch {
      return '';
    }
  }
  return '';
}

function writeSse(res, event, payload) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function streamChunksToSse(asyncIterable, res) {
  let emittedSoFar = '';
  for await (const chunk of asyncIterable) {
    const rawText = extractChunkText(chunk);
    if (!rawText) continue;

    // Some SDK chunks are cumulative; convert to incremental delta.
    let delta = rawText;
    if (rawText.startsWith(emittedSoFar)) {
      delta = rawText.slice(emittedSoFar.length);
    }
    if (!delta) continue;

    emittedSoFar += delta;
    writeSse(res, 'token', { text: delta });
  }
}

router.post('/', async (req, res) => {
  try {
    const { prompt, isThinking, subject, chapter } = req.body;
    const wantsStream = req.get('x-chat-stream') === '1';
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }
    
    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
    if (!rawKeys) {
      return res.status(500).json({ error: "API Key not configured." });
    }
    const apiKeys = rawKeys.split(',').map(k => k.trim()).filter(k => k);

    let systemContext = `You are a helpful AI Tutor. We are discussing the subject ${subject}, specifically the chapter ${chapter}. Explain concepts simply and effectively for a student. `;
    if (isThinking) {
      systemContext += `Please show your step-by-step reasoning before providing the final answer, acting as a deep thinker. `;
    }

    let attempt = 0;
    // Retry up to the number of keys we have, or at least 5 times
    const MAX_RETRIES = Math.max(5, apiKeys.length);

    if (wantsStream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      if (typeof res.flushHeaders === 'function') {
        res.flushHeaders();
      }
    }
    
    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const currentKey = apiKeys[(attempt - 1) % apiKeys.length];
        
        // Primary path: stream token chunks via the new GenAI SDK
        try {
          const { GoogleGenAI } = require("@google/genai");
          const ai = new GoogleGenAI({ apiKey: currentKey });
          
          const configObj = { systemInstruction: systemContext };
          if (isThinking) {
            configObj.thinkingConfig = { thinkingLevel: 'high', includeThoughts: true };
          }

          if (wantsStream) {
            const response = await ai.models.generateContentStream({
              model: "gemini-3-flash-preview",
              contents: `Student: ${prompt}`,
              config: configObj
            });

            await streamChunksToSse(response, res);
            writeSse(res, 'done', {});
            return res.end();
          }

          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Student: ${prompt}`,
            config: configObj
          });

          let finalReply = "";
          let thoughtsSummary = "";
          if (response.candidates && response.candidates[0] && response.candidates[0].content) {
            for (const part of response.candidates[0].content.parts) {
              if (!part.text) continue;
              if (part.thought) thoughtsSummary += part.text + "\n";
              else finalReply += part.text;
            }
          } else {
            finalReply = response.text || "";
          }
          return res.json({ reply: finalReply, thoughts: thoughtsSummary.trim() || undefined });
        } catch (newSdkError) {
          console.warn(`[Attempt ${attempt} - Key ${((attempt - 1) % apiKeys.length) + 1}] New SDK failed, falling back to legacy...`, newSdkError.message);
          // Fallback to legacy SDK if new SDK fails
          const { GoogleGenerativeAI } = require("@google/generative-ai");
          const genAI = new GoogleGenerativeAI(currentKey);
          const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
          if (wantsStream) {
            const streamResult = await model.generateContentStream(`${systemContext}\n\nStudent: ${prompt}`);
            const stream = streamResult.stream || streamResult;
            await streamChunksToSse(stream, res);
            writeSse(res, 'done', {});
            return res.end();
          }

          const result = await model.generateContent(`${systemContext}\n\nStudent: ${prompt}`);
          const response = await result.response;
          return res.json({ reply: response.text() || "" });
        }
      } catch (error) {
        console.error(`[Attempt ${attempt} - Key ${((attempt - 1) % apiKeys.length) + 1}] Gemini Error:`, error.message);
        
        if (attempt >= MAX_RETRIES) {
          const message = (error.status === 429 || error.message.includes('Quota'))
            ? "Gemini 3 Quota Exceeded on all available keys. Please add more keys or try again later."
            : `AI Failed after ${MAX_RETRIES} attempts. Last error: ${error.message}`;

          if (wantsStream) {
            if (!res.writableEnded) {
              writeSse(res, 'error', { message });
              res.end();
            }
            return;
          }
          const statusCode = (error.status === 429 || error.message.includes('Quota')) ? 429 : 500;
          return res.status(statusCode).json({ error: message });
        }
        if (!wantsStream && (error.status === 429 || error.message.includes('Quota'))) {
          return res.status(429).json({ error: "Gemini 3 Quota Exceeded on all available keys. Please add more keys or try again later." });
        }
        if (!wantsStream && attempt >= MAX_RETRIES) {
          return res.status(500).json({ error: `AI Failed after ${MAX_RETRIES} attempts. Last error: ${error.message}` });
        }
        if (wantsStream && attempt >= MAX_RETRIES) {
          return;
        }
        // Wait 1 second before retrying next key
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error("Critical Chat Route Error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "A critical error occurred." });
    }
    if (!res.writableEnded) {
      writeSse(res, 'error', { message: "A critical error occurred." });
      res.end();
    }
  }
});

module.exports = router;
