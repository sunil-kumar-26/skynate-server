const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const axios = require("axios");
const googleService = require("./googleService");

const createUser = async (data) => {
  const userCreated = await authModel.create(data);
  return userCreated;
};

const findUserByEmail = async (email) => {
  const emailAvailable = await authModel.findOne({ email });
  return emailAvailable;
};

const findUserByIdAndHashedToken = async (id, hashedToken) => {
  const emailAvailable = await authModel.findOne({
    _id: id,
    emailVerifyToken: hashedToken,
    emailVerifyExpiresAt: { $gt: Date.now() },
  });
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

const googleLogin = async () => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
    });

  return url;
};

const googleLoginCallback = async (req, res) => {
  try {
    const tokenRes = await googleService.handleCallBack(req, res);
    const idToken = tokenRes.data.id_token;
    const userInfo = await googleService.handleGoogleToken(idToken);
    return userInfo;
  } catch (err) {
    console.error(err);
    res.send("Login failed");
  }
};

module.exports = {
  googleLoginCallback,
  googleLogin,
  findUserByEmail,
  createUser,
  setResetToken,
  findUserByResetToken,
  clearResetToken,
  updateUserPassword,
  findUserByIdAndHashedToken,
};
