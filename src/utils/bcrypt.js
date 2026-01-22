const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

async function bcryptPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

async function comparePassword(password, storedPassword) {
  const varified = bcrypt.compare(password, storedPassword);
  return varified;
}
module.exports = { bcryptPassword, comparePassword };
