const express = require("express");
const Router = express.Router();

const listingController = require("../controller/listing.controller");

// /api/v1/listings

Router.route("/")
  .post(listingController.createListing)
  .get(listingController.getAllListings);

Router.route("/:id")
  .get(listingController.getListingByID)
  .delete(listingController.deleteListingById)
  .patch(listingController.updateListById);

module.exports = {
  listingRoute: Router,
};
