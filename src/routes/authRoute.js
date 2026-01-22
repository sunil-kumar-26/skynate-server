const express = require("express");
const authRouter = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const authController = require("../controllers/authController");
const authSchema = require("../validations/authValidation");
const validate = require("../middlewares/authMiddleware");

authRouter.post(
  "/signup",
  validate(authSchema.createAuthSchema),
  asyncHandler(authController.userSignup)
);
authRouter.post(
  "/login",
  validate(authSchema.authLoginSchema),
  asyncHandler(authController.userLogin)
);

authRouter.put(
  "/forgotPassword",
  validate(authSchema.authResetPasswordSchema),
  asyncHandler(authController.forgotPassword)
);

authRouter.post('/resetPassword',asyncHandler(authController.resetPassword))
module.exports = authRouter;
