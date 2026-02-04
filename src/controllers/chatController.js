const { generateAIResponse } = require("../services/geminiService");
const chatService = require("../services/chatService");

exports.chatWithAI = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  const chat = await chatService.saveUserMessage(userId, message);
  const aiReply = await generateAIResponse(message);

  await chatService.saveAIMessage(chat, aiReply);
  res.status(200).json({ reply: aiReply });
};

exports.getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const chat = await chatService.getChatByUser(userId);
  res.status(200).json(chat || { messages: [] });
};
