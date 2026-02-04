const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddleware");

router.post("/chat", jwtAuthMiddleware, chatController.chatWithAI);
router.get("/chat/history", jwtAuthMiddleware, chatController.getChatHistory);

module.exports = router;
