require('dotenv').config({ path: '/home/RatAnon/Code/TISD/tisd/backend/.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Actually, standard SDK doesn't expose listModels easily. Let's just fetch it via REST.
}
run();
