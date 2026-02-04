const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authenicate-user-collection",
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("chat", chatSchema);
