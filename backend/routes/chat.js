const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt, isThinking, subject, chapter } = req.body;
    
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
    
    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const currentKey = apiKeys[(attempt - 1) % apiKeys.length];
        
        // Attempt to use new GenAI SDK as primary (Gemini 3 Flash Preview)
        try {
          const { GoogleGenAI } = require("@google/genai");
          const ai = new GoogleGenAI({ apiKey: currentKey });
          
          const configObj = { systemInstruction: systemContext };
          if (isThinking) {
            configObj.thinkingConfig = { thinkingLevel: 'high', includeThoughts: true };
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
              if (part.thought) {
                thoughtsSummary += part.text + "\n";
              } else {
                finalReply += part.text;
              }
            }
          } else {
            finalReply = response.text; // Fallback to raw text
          }

          return res.json({ reply: finalReply, thoughts: thoughtsSummary.trim() || undefined });
        } catch (newSdkError) {
          console.warn(`[Attempt ${attempt} - Key ${((attempt - 1) % apiKeys.length) + 1}] New SDK failed, falling back to legacy...`, newSdkError.message);
          // Fallback to legacy SDK if new one fails (highly revertible/safe)
          const { GoogleGenerativeAI } = require("@google/generative-ai");
          const genAI = new GoogleGenerativeAI(currentKey);
          const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
          const result = await model.generateContent(`${systemContext}\n\nStudent: ${prompt}`);
          const response = await result.response;
          return res.json({ reply: response.text() });
        }
      } catch (error) {
        console.error(`[Attempt ${attempt} - Key ${((attempt - 1) % apiKeys.length) + 1}] Gemini Error:`, error.message);
        
        if (attempt >= MAX_RETRIES) {
          if (error.status === 429 || error.message.includes('Quota')) {
             return res.status(429).json({ error: "Gemini 3 Quota Exceeded on all available keys. Please add more keys or try again later." });
          }
          return res.status(500).json({ error: `AI Failed after ${MAX_RETRIES} attempts. Last error: ${error.message}` });
        }
        // Wait 1 second before retrying next key
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error("Critical Chat Route Error:", error);
    res.status(500).json({ error: "A critical error occurred." });
  }
});

module.exports = router;
