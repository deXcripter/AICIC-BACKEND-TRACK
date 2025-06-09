const express = require("express");
const Router = express.Router();

const userController = require("../controller/user.controller");

Router.post("/signup", userController.createUserAccount);

module.exports = {
  userRoute: Router,
};
