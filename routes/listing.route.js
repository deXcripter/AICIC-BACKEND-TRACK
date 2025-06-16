const express = require("express");
const Router = express.Router();

const listingController = require("../controller/listing.controller");
const { protectRoute } = require("../middleware/protectRoute");

// /api/v1/listings

Router.route("/")
  .post(protectRoute, listingController.createListing)
  .get(protectRoute, listingController.getAllListings);

Router.route("/:id")
  .get(listingController.getListingByID)
  .delete(protectRoute, listingController.deleteListingById)
  .patch(protectRoute, listingController.updateListById);

module.exports = {
  listingRoute: Router,
};
