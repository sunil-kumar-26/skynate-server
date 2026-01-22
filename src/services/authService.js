const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

const createUser = async (data) => {
  const userCreated = await authModel.create(data);
  return userCreated;
};

const findUserByEmail = async (email) => {
  const emailAvailable = await authModel.findOne({ email });
  return emailAvailable;
};

const setResetToken = async (userId, hashedToken, expireAt) => {
  const reset = await authModel.findByIdAndUpdate(userId, {
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: expireAt,
  });
  return reset;
};

const findUserByResetToken = async (userId, hashedToken) => {
  const userByResetToken = await authModel.findOne({
    _id: userId,
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });
  return userByResetToken;
};

const clearResetToken = async (userId) => {
  const clearedToken = await authModel.findByIdAndUpdate(userId, {
    $unset: { resetPasswordToken: "", resetPasswordExpiresAt: "" },
  });
  return clearedToken;
};

const updateUserPassword = async (userId, newHashedPassword) => {
  const newPassword = await authModel.findByIdAndUpdate(userId, {
    password: newHashedPassword,
  });
  return newPassword;
};

module.exports = {
  findUserByEmail,
  createUser,
  setResetToken,
  findUserByResetToken,
  clearResetToken,
  updateUserPassword,
};
