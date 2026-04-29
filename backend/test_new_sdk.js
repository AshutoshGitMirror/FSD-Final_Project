require('dotenv').config({ path: '/home/RatAnon/Code/TISD/tisd/backend/.env' });
const { GoogleGenAI } = require('@google/genai');

async function run() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{role: "user", parts: [{text: "Hello! My name is Bob."}]}],
      config: { systemInstruction: "You are a pirate." }
    });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
