const express = require("express");
const authController = require("../controller/auth.controller");
const Router = express.Router();

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);

Router.post("/forgot-password", authController.forgotPassword);
Router.post("/reset-password", authController.resetPassword);

module.exports = {
  authRoute: Router,
};
