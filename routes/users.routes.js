const express = require("express");
const userController = require("../controller/user.controller");
const { protectRoute } = require("../middleware/protectRoute");
const Router = express.Router();

Router.get(
  "/",
  protectRoute,
  userController.onlyAdmin,
  userController.getAllUsers
);

Router.delete(
  "/:userId",
  protectRoute,
  userController.onlyAdmin,
  userController.deleteUser
);

module.exports = {
  userRoute: Router,
};
