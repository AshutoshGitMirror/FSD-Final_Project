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

function pickOllamaModels(prompt = '', isThinking = false) {
  if (isThinking) {
    const thinkingModels = (process.env.OLLAMA_MODELS_THINKING || process.env.OLLAMA_MODELS || '')
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
    if (thinkingModels.length > 0) return thinkingModels;
    return ['deepseek-r1:latest', 'llama3.1:8b', 'gemma3:12b'];
  }

  const defaultModels = (process.env.OLLAMA_MODELS_DEFAULT || process.env.OLLAMA_MODELS || '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
  if (defaultModels.length > 0) return defaultModels;

  const text = String(prompt).toLowerCase();
  if (/(summari|list|define|solve)/.test(text)) {
    return ['gemma3:12b', 'llama3.1:8b'];
  }
  if (/(why|how|explain|reason)/.test(text)) {
    return ['llama3.1:8b', 'gemma3:12b'];
  }
  return ['llama3.1:8b', 'gemma3:12b'];
}

async function runOllamaChatEndpoint({ prompt, systemContext, isThinking, wantsStream, res }) {
  const base = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/+$/, '');
  const chatPath = process.env.OLLAMA_CHAT_PATH || '/chat';
  const sessionId = `chat-${Date.now()}`;
  const query = `${systemContext}\n\nStudent: ${prompt}`;
  const url =
    `${base}${chatPath}?query=${encodeURIComponent(query)}` +
    `&session_id=${encodeURIComponent(sessionId)}` +
    `&deep_research=${isThinking ? 'true' : 'false'}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/x-ndjson'
    }
  });

  if (!response.ok || !response.body) {
    throw new Error(`Ollama /chat HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let ndjson = '';
  let full = '';
  let modelName = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    ndjson += decoder.decode(value, { stream: true });

    let lineBreak = ndjson.indexOf('\n');
    while (lineBreak !== -1) {
      const line = ndjson.slice(0, lineBreak).trim();
      ndjson = ndjson.slice(lineBreak + 1);
      if (line) {
        const parsed = JSON.parse(line);
        if (parsed.error) throw new Error(parsed.error);

        if (!modelName && parsed.model_name) {
          modelName = parsed.model_name;
        }

        const token = parsed.response || '';
        if (token) {
          full += token;
          if (wantsStream) {
            writeSse(res, 'token', { text: token });
          }
        }
      }
      lineBreak = ndjson.indexOf('\n');
    }
  }

  ndjson += decoder.decode();
  if (ndjson.trim()) {
    const parsed = JSON.parse(ndjson.trim());
    if (parsed.error) throw new Error(parsed.error);
    if (!modelName && parsed.model_name) {
      modelName = parsed.model_name;
    }
    const token = parsed.response || '';
    if (token) {
      full += token;
      if (wantsStream) {
        writeSse(res, 'token', { text: token });
      }
    }
  }

  if (!full.trim()) {
    throw new Error('Ollama /chat returned empty output');
  }

  return { reply: full, model: modelName || (isThinking ? 'deepseek-r1:latest' : 'llama3.1:8b') };
}

async function runOllamaGenerateFallback({ prompt, systemContext, isThinking, wantsStream, res }) {
  const base = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/+$/, '');
  const models = pickOllamaModels(prompt, isThinking);
  const fullPrompt = `${systemContext}\n\nStudent: ${prompt}`;
  const failures = [];

  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(`${base}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          prompt: fullPrompt,
          stream: true
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`Ollama /api/generate HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let ndjson = '';
      let full = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        ndjson += decoder.decode(value, { stream: true });

        let lineBreak = ndjson.indexOf('\n');
        while (lineBreak !== -1) {
          const line = ndjson.slice(0, lineBreak).trim();
          ndjson = ndjson.slice(lineBreak + 1);
          if (line) {
            const parsed = JSON.parse(line);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            const token = parsed.response || '';
            if (token) {
              full += token;
              if (wantsStream) {
                writeSse(res, 'token', { text: token });
              }
            }
          }
          lineBreak = ndjson.indexOf('\n');
        }
      }

      ndjson += decoder.decode();
      if (ndjson.trim()) {
        const parsed = JSON.parse(ndjson.trim());
        if (parsed.error) throw new Error(parsed.error);
        const token = parsed.response || '';
        if (token) {
          full += token;
          if (wantsStream) {
            writeSse(res, 'token', { text: token });
          }
        }
      }

      if (!full.trim()) {
        throw new Error(`Ollama model ${model} returned empty output`);
      }

      return { reply: full, model };
    } catch (err) {
      failures.push(`${model}: ${err.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Ollama fallback failed (${failures.join(' | ')})`);
}

async function runOllamaFallback({ prompt, systemContext, isThinking, wantsStream, res }) {
  const failures = [];
  try {
    return await runOllamaChatEndpoint({ prompt, systemContext, isThinking, wantsStream, res });
  } catch (chatError) {
    failures.push(`/chat: ${chatError.message}`);
  }

  const allowGenerateFallback = process.env.OLLAMA_ALLOW_GENERATE_FALLBACK !== '0';
  if (allowGenerateFallback) {
    try {
      return await runOllamaGenerateFallback({ prompt, systemContext, isThinking, wantsStream, res });
    } catch (generateError) {
      failures.push(`/api/generate: ${generateError.message}`);
    }
  }

  throw new Error(`Ollama fallback failed (${failures.join(' | ')})`);
}

router.post('/', async (req, res) => {
  try {
    const { prompt, isThinking, subject, chapter } = req.body;
    const wantsStream = req.get('x-chat-stream') === '1';
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }
    
    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
    const apiKeys = rawKeys.split(',').map(k => k.trim()).filter(k => k);

    let systemContext = `You are a helpful AI Tutor. We are discussing the subject ${subject}, specifically the chapter ${chapter}. Explain concepts simply and effectively for a student. `;
    if (isThinking) {
      systemContext += `For deep-thinking mode, format output exactly as:
<think>
step-by-step reasoning
</think>
final student-facing answer
Do not skip the <think>...</think> block. `;
    }

    let lastGeminiError = '';
    let lastOllamaError = '';

    if (wantsStream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      if (typeof res.flushHeaders === 'function') {
        res.flushHeaders();
      }
    }
    
    // Primary path:
    // - DeepThink: deepseek-r1 first (then optional local model fallbacks)
    // - Non-DeepThink: ollama/gemma local models first
    try {
      const ollama = await runOllamaFallback({
        prompt,
        systemContext,
        isThinking,
        wantsStream,
        res
      });

      if (wantsStream) {
        writeSse(res, 'meta', { provider: 'ollama', model: ollama.model });
        writeSse(res, 'done', {});
        return res.end();
      }

      return res.json({ reply: ollama.reply, provider: 'ollama', model: ollama.model });
    } catch (ollamaError) {
      lastOllamaError = ollamaError.message || 'Ollama request failed';
      console.warn('Ollama primary path failed; falling back to Gemini:', lastOllamaError);
    }

    // Pure fallback: Gemini (only used if local model chain fails)
    const MAX_RETRIES = apiKeys.length > 0 ? Math.max(5, apiKeys.length) : 0;
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      attempt++;
      const keyIndex = (attempt - 1) % apiKeys.length;
      const currentKey = apiKeys[keyIndex];
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
        try {
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
        } catch (legacyError) {
          lastGeminiError = legacyError.message || newSdkError.message || 'Gemini request failed';
          console.error(`[Attempt ${attempt} - Key ${keyIndex + 1}] Gemini Error:`, lastGeminiError);
        }
      }

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const message = apiKeys.length > 0
      ? `Ollama primary failed: ${lastOllamaError || 'unknown error'}. Gemini fallback failed: ${lastGeminiError || 'unknown error'}`
      : `Ollama primary failed: ${lastOllamaError || 'unknown error'}. Gemini fallback unavailable: API keys not configured.`;

    if (wantsStream) {
      if (!res.writableEnded) {
        writeSse(res, 'error', { message });
        res.end();
      }
      return;
    }

    const isQuotaError = /quota|429/i.test(lastGeminiError || '');
    return res.status(isQuotaError ? 429 : 500).json({ error: message });
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
