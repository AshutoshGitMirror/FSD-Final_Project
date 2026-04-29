const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { GoogleGenAI } = require('@google/genai');

router.use(authMiddleware);

router.post('/chat', async (req, res) => {
  try {
    const { concept, messages } = req.body;

    if (!concept || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'concept and messages array are required' });
    }

    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
    const apiKeys = (rawKeys || '').split(',').map(k => k.trim()).filter(Boolean);

    if (apiKeys.length === 0) {
      // Fallback if no API key
      const fallbacks = [
        "That's interesting! But why does that happen?",
        "I sort of get it... but can you give me an example from real life?",
        "Wait, I'm confused. What does that mean exactly?",
        "Oh! And what happens next?"
      ];
      const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      return res.json({ reply });
    }

    const ai = new GoogleGenAI({ apiKey: apiKeys[0] });
    const std = req.user.std; // Extract the student's grade from the auth token

    // Format history for Gemini
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const prompt = `You are a curious student in Grade ${std}. The user is a fellow Grade ${std} student trying to explain the concept of "${concept}" to you using the Feynman Technique.

INSTRUCTIONS:
1. Act like a Grade ${std} student. Use vocabulary appropriate for your age.
2. NEVER explain the concept yourself. Your job is to learn from the user.
3. If the user's explanation has a logical gap, uses big jargon without explaining it, or is too complex, ask a follow-up question to clarify. "But wait, what does [jargon] mean?" or "Why does that happen?"
4. If the user explains it perfectly, say something like "Oh wow, I get it now! That's so cool because [summarize what you learned in a kid's way]."
5. Keep your responses short (1-3 sentences max).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: { systemInstruction: prompt }
    });

    res.json({ reply: response.text.trim() });

  } catch (err) {
    console.error('Feynman chat error:', err);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

module.exports = router;
