const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String },
    emailVerifyExpiresAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

const users = mongoose.model("authenicate-user-collection", userSchema);
module.exports = users;
