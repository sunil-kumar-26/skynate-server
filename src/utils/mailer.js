const { Resend } = require("resend");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetMail = async ({ to, resetUrl }) => {
  return await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your Skynate password",
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

const sendSignUpMail = async ({ to }) => {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/mail/signupMail.ejs"),
      { email: to }
    );

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Welcome to Skynate ",
      html,
    });
    return response;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};

const verifyMail = async ({ to, verifyMail }) => {
  const html = await ejs.renderFile(
    path.join(__dirname, "../views/mail/verifyMail.ejs"),
    { email: to, verify: verifyMail },
  );

  return await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your Skynate account",
    html,
  });
};

module.exports = { sendResetMail, sendSignUpMail, verifyMail };
