const joi = require("joi");

const createAuthSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  terms: joi.boolean(),
});

const authLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const authResetPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

module.exports = { createAuthSchema, authLoginSchema, authResetPasswordSchema };
