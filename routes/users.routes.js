const express = require("express");
const userController = require("../controller/user.controller");
const Router = express.Router();

Router.get("/", userController.getAllUsers);

module.exports = {
  userRoute: Router,
};
