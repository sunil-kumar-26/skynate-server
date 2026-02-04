const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateAIResponse = async (message) => {
  try {
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    throw err;
  }
};

module.exports = { generateAIResponse };
