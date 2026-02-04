const Chat = require("../models/chatModel");

const saveUserMessage = async (userId, message) => {
  return Chat.findOneAndUpdate(
    { userId },
    { $push: { messages: { role: "user", content: message } } },
    { upsert: true, new: true },
  );
};

const saveAIMessage = async (chat, aiMessage) => {
  chat.messages.push({
    role: "assistant",
    content: aiMessage,
  });
  return chat.save();
};

const getChatByUser = async (userId) => {
  return Chat.findOne({ userId });
};

module.exports = {
  saveUserMessage,
  saveAIMessage,
  getChatByUser,
};
