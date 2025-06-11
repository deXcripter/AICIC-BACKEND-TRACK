const express = require("express");
const authController = require("../controller/auth.controller");
const Router = express.Router();

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);

module.exports = {
  authRoute: Router,
};
