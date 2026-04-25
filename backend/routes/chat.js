const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/', async (req, res) => {
  try {
    const { prompt, isThinking, subject, chapter } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API Key not configured." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    let systemContext = `You are a helpful AI Tutor. We are discussing the subject ${subject}, specifically the chapter ${chapter}. Explain concepts simply and effectively for a student. `;
    if (isThinking) {
      systemContext += `Please show your step-by-step reasoning before providing the final answer, acting as a deep thinker. `;
    }

    const result = await model.generateContent(`${systemContext}\n\nStudent: ${prompt}`);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

module.exports = router;
