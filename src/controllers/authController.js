const { bcryptPassword, comparePassword } = require("../utils/bcrypt");
const authService = require("../services/authService");
const { signJwt } = require("../utils/jwt");
const createResetToken = require("../utils/token");
const { sendResetMail,sendSignUpMail } = require("../utils/mailer");
const crypto = require("crypto");
require("dotenv").config();

exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExist = await authService.findUserByEmail(email);
  if (emailExist)
    return res
      .status(400)
      .json({ message: "Email already taken, please choose different" });
  const hashPassword = await bcryptPassword(password);
  const userData = await authService.createUser({
    name: name,
    email: email,
    password: hashPassword,
  });
  await sendSignUpMail({to:email})
  return res
    .status(201)
    .json({ message: "user created successfully", data: userData });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);

  if (!user.email) return res.status(401).json({ message: "Email not found " });
  const varified = await comparePassword(password, user.password);
  if (!varified) return res.status(401).json({ message: "invalid password" });
  const token = signJwt({ id: user.id, email: user.email });
  return res
    .status(200)
    .json({ message: "User logged in succussfully", token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUserByEmail(email);
  if (!user)
    return res.status(200).json({
      messsage: "if that email is registered, you will get reset link",
    });
  const { resetToken, hashedToken } = createResetToken();
  const expireInMinutes = Number(process.env.RESET_TOKEN_EXPIRES_MIN || 35);
  const expireAt = new Date(Date.now() + expireInMinutes * 60 * 1000);
  await authService.setResetToken(user._id, hashedToken, expireAt);
  const resetUrl = `${
    process.env.FRONTEND_URL || "http://localhost:4000"
  }/resetPassword?token=${resetToken}&id=${user._id}`;
  await sendResetMail({ to: user.email, resetUrl });
  return res.status(200).json({
    message: "If that email is registered, you'll receive a reset link",
    resetUrlForTesting: resetUrl,
  });
};

exports.resetPassword = async (req, res) => {
  const { token, id, password } = req.body;
  if (!token || !id || !password)
    return res.status(400).json({ message: "token,id and password required" });
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await authService.findUserByResetToken(id, hashedToken);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  const newHashedPassword = await bcryptPassword(password);
  await authService.updateUserPassword(user.id, newHashedPassword);
  await authService.clearResetToken(user.id);
  return res.status(200).json({ message: "Password reset successful" });
};
