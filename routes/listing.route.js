const express = require("express");
const Router = express.Router();

const listingController = require("../controller/listing.controller");

Router.post("/", listingController.createListing);

module.exports = {
  listingRoute: Router,
};
