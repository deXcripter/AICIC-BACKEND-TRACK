const Listing = require("../models/listing.model");

exports.createListing = async (req, res) => {
  const newListing = await Listing.create(req.body);

  res.json({
    data: newListing,
    message: "You have successfully created a product for listing",
  });
};
