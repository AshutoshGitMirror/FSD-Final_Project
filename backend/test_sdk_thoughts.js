require('dotenv').config({ path: '/home/RatAnon/Code/TISD/tisd/backend/.env' });
const { GoogleGenAI } = require('@google/genai');

async function run() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Why is the sky blue?",
      config: {
        thinkingConfig: {
            thinkingLevel: 'high',
            includeThoughts: true
        }
      }
    });
    console.log("Success!");
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
