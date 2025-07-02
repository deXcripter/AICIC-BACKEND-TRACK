const express = require("express");
const userController = require("../controller/user.controller");
const listingController = require("../controller/listing.controller");
const { protectRoute } = require("../middleware/protectRoute");
const Router = express.Router();

Router.get("/", protectRoute, userController.getAllUsers);

Router.get("/:userId", userController.getUserProfile);
Router.get("/:userId/listings", listingController.getUserListings);

Router.delete(
  "/:userId",
  protectRoute,
  userController.onlyAdmin,
  userController.deleteUser
);

module.exports = {
  userRoute: Router,
};
