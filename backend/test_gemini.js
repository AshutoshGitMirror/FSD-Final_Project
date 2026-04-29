require('dotenv').config({ path: '/home/RatAnon/Code/TISD/tisd/backend/.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    console.log("API Key found:", !!process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.0-flash-preview" });
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage("Hello");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Error:", err.message);
  }
}
run();
