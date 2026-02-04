const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendResetMail = async ({ to, resetUrl }) => {
  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Password reset for your account",
    text: `You requested a password reset. Click the link to reset your password:\n\n${resetUrl}\n\nIf you didn't request this, ignore this email.`,
    html: `<p>You requested a password reset. Click the link to reset your password:</p>
           <p><a href="${resetUrl}">${resetUrl}</a></p>
           <p>If you didn't request this, ignore this email.</p>`,
  });
  return info;
};
const sendSignUpMail = async ({ to }) => {
  const html = await ejs.renderFile(
    path.join(__dirname, "../views/mail/signupMail.ejs"),
    { email: to },
  );
  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Skynate Signup",
    html,
  });
  return info;
};
const verifyMail = async ({ to, verifyMail }) => {
  const html = await ejs.renderFile(
    path.join(__dirname, "../views/mail/verifyMail.ejs"),
    { email: to, verify: verifyMail },
  );
  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Skynate Verify",
    html,
  });
  return info;
};

module.exports = { sendResetMail, sendSignUpMail, verifyMail };
