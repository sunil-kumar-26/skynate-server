const nodemailer = require("nodemailer");
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
  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "SignUp Mail",
    text: `Account is successfully created, If you didn't request this, ignore this email.`,
    html: `<p>Hii,user you have successfully created account on devbros using your ${to} </p>
           <p>If you are not signup, ignore this email.</p></div>`,
  });
  return info;
};

module.exports = { sendResetMail, sendSignUpMail };
