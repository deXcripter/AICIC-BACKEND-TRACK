const express = require("express");
const Router = express.Router();

const listingController = require("../controller/listing.controller");
const { protectRoute } = require("../middleware/protectRoute");

/**
 * {
  createListing: [Function (anonymous)],
  getAllListings: [Function (anonymous)],
  getListingByID: [Function (anonymous)],
  deleteListingById: [Function (anonymous)],
  updateListById: [Function (anonymous)],
  getUserListings: [Function (anonymous)]
  printTime()
}
 */
// console.log(listingController);

Router.route("/")
  .post(protectRoute, listingController.createListing)
  .get(listingController.getAllListings);

Router.route("/:id")
  .get(protectRoute, listingController.getListingByID)
  .delete(protectRoute, listingController.deleteListingById)
  .patch(protectRoute, listingController.updateListById);

module.exports = {
  listingRoute: Router,
};
