const Listing = require("../models/listing.model");

exports.createListing = async (req, res) => {
  try {
    console.log(req.body);
    const newListing = await Listing.create(req.body);

    res.json({
      data: newListing,
      message: "You have successfully created a product for listing",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid Data" });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json({
      status: "success",
      length: listings.length,
      data: {
        listings,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "error", message: "No route found." });
  }
};

exports.getListingByID = async (req, res) => {
  const id = req.params.id;

  const listing = await Listing.findOne({ _id: id });
  if (!listing)
    res.status(404).json({ message: "Listing does not exist", status: "fail" });
  else {
    res.json({ message: "Listing found", data: listing });
  }
};

exports.deleteListingById = async (req, res) => {
  const id = req.params.id;

  const list = await Listing.findOne({ _id: id });
  console.log(list);
  if (!list)
    res.status(404).json({ message: "Item does not exist", status: "fail" });
  else {
    await list.deleteOne();
    // list.save();
    res.status(200).json({ message: "Item deleted successfully" });
  }
};
