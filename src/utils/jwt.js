const jwt = require("jsonwebtoken");
require("dotenv").config();

const signJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

const varifyJwt = (token) => {
  return jwt.varifyJwt(token, cess.env.JWT_SECRET);
};

module.exports = { signJwt, varifyJwt };
