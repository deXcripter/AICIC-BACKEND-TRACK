const express = require("express");
const userController = require("../controller/user.controller");
const listingController = require("../controller/listing.controller");
const { protectRoute } = require("../middleware/protectRoute");
const Router = express.Router();
const { onlyAdmin } = require("../middleware/onlyAdmin");

Router.get("/", userController.getAllUsers);

Router.get("/:userId", userController.getUserProfile);
Router.get("/:userId/listings", listingController.getUserListings);

Router.patch(
  "/:userId/upgrade-to-admin",
  protectRoute,
  onlyAdmin,
  userController.upgradeToAdmin
);

Router.delete(
  "/:userId",
  protectRoute,
  onlyAdmin,
  userController.deleteUser
);

module.exports = {
  userRoute: Router,
};
