const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

/**
 * Feynman sandbox route.
 *
 * The model is instructed to behave like a same-grade peer learner and ask
 * clarifying questions, not to deliver teacher-style explanations.
 *
 * Uses the same Gemini key-rotation + Ollama fallback chain as chat.js:
 *   Gemini (rotate keys, retry) → Ollama (deepseek-r1 → llama3.1 → gemma3)
 */

router.use(authMiddleware);

// ── Ollama fallback (mirrors chat.js pattern) ──────────────────
async function runOllamaFallback(systemPrompt, conversationHistory) {
  const base = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/+$/, '');
  const models = ['llama3.1:8b', 'gemma3:12b', 'deepseek-r1:latest'];

  // Build a single prompt from the conversation
  let fullPrompt = systemPrompt + '\n\n';
  for (const msg of conversationHistory) {
    const role = msg.role === 'assistant' || msg.role === 'model' ? 'Student peer' : 'User';
    fullPrompt += `${role}: ${msg.content || msg.parts?.[0]?.text || ''}\n`;
  }

  const failures = [];

  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(`${base}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ model, prompt: fullPrompt, stream: false })
      });

      if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);

      const data = await response.json();
      const reply = (data.response || '').trim();
      if (!reply) throw new Error(`Ollama model ${model} returned empty output`);
      return { reply, model };
    } catch (err) {
      failures.push(`${model}: ${err.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Ollama fallback failed (${failures.join(' | ')})`);
}

router.post('/chat', async (req, res) => {
  try {
    const { concept, messages } = req.body;

    if (!concept || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'concept and messages array are required' });
    }

    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
    const apiKeys = rawKeys.split(',').map(k => k.trim()).filter(Boolean);
    const std = req.user.std;

    const systemPrompt = `You are a curious student in Grade ${std}. The user is a fellow Grade ${std} student trying to explain the concept of "${concept}" to you using the Feynman Technique.

INSTRUCTIONS:
1. Act like a Grade ${std} student. Use vocabulary appropriate for your age.
2. NEVER explain the concept yourself. Your job is to learn from the user.
3. If the user's explanation has a logical gap, uses big jargon without explaining it, or is too complex, ask a follow-up question to clarify. "But wait, what does [jargon] mean?" or "Why does that happen?"
4. If the user explains it perfectly, say something like "Oh wow, I get it now! That's so cool because [summarize what you learned in a kid's way]."
5. Keep your responses short (1-3 sentences max).`;

    // Convert frontend chat structure to Gemini's role/content schema.
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // ── Gemini with key rotation (same pattern as chat.js) ──────
    const MAX_RETRIES = apiKeys.length > 0 ? Math.max(5, apiKeys.length) : 0;
    let attempt = 0;
    let lastGeminiError = '';

    while (attempt < MAX_RETRIES) {
      attempt++;
      const keyIndex = (attempt - 1) % apiKeys.length;
      const currentKey = apiKeys[keyIndex];
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({ apiKey: currentKey });

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: contents,
          config: { systemInstruction: systemPrompt }
        });

        const reply = (typeof response.text === 'function' ? response.text() : response.text) || '';
        return res.json({ reply: reply.trim() });
      } catch (newSdkError) {
        // Try legacy SDK
        try {
          const { GoogleGenerativeAI } = require('@google/generative-ai');
          const genAI = new GoogleGenerativeAI(currentKey);
          const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

          const result = await model.generateContent(
            `${systemPrompt}\n\n${messages.map(m => `${m.role === 'assistant' ? 'Student peer' : 'User'}: ${m.content}`).join('\n')}`
          );
          const response = await result.response;
          const reply = (typeof response.text === 'function' ? response.text() : response.text) || '';
          return res.json({ reply: reply.trim() });
        } catch (legacyError) {
          lastGeminiError = legacyError.message || newSdkError.message || 'Gemini request failed';
          console.error(`[Feynman Attempt ${attempt} - Key ${keyIndex + 1}] Gemini Error:`, lastGeminiError);
        }
      }

      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // ── Ollama fallback chain ──────────────────────────────────
    try {
      const ollama = await runOllamaFallback(systemPrompt, messages);
      return res.json({ reply: ollama.reply, provider: 'ollama', model: ollama.model });
    } catch (ollamaError) {
      // ── Final static fallback ─────────────────────────────────
      const fallbacks = [
        "That's interesting! But why does that happen?",
        "I sort of get it... but can you give me an example from real life?",
        "Wait, I'm confused. What does that mean exactly?",
        "Oh! And what happens next?",
        "Hmm, that sounds complicated. Can you break it down more simply?",
        "But what would happen if it was different? Like, the opposite?"
      ];
      const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];

      console.warn(
        `[Feynman] All AI providers failed. Gemini: ${lastGeminiError || 'no keys'}. Ollama: ${ollamaError.message}. Using static fallback.`
      );
      return res.json({ reply, provider: 'fallback' });
    }
  } catch (err) {
    console.error('Feynman chat critical error:', err);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

module.exports = router;
