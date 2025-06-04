const Listing = require("../models/listing.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");

exports.createListing = asyncHandler(async (req, res) => {
  const newListing = await Listing.create(req.body);

  res.json({
    data: newListing,
    message: "You have successfully created a product for listing",
  });
});

exports.getAllListings = asyncHandler(async (req, res, next) => {
  const listings = await Listing.find();
  res.json({
    status: "success",
    length: listings.length,
    data: {
      listings,
    },
  });
});

exports.getListingByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const listing = await Listing.findOne({ _id: id });
  if (!listing)
    return next(new AppError("Listing does not exist", 404));
  else {
    res.json({ message: "Listing found", data: listing });
  }
});

exports.deleteListingById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const list = await Listing.findOne({ _id: id });
  console.log(list);
  if (!list) {
    next(new AppError("No item found", 404));
  } else {
    await list.deleteOne();
    // list.save();
    res.status(200).json({ message: "Item deleted successfully" });
  }
});

exports.updateListById = asyncHandler(async (req, res, nexts) => {
  const id = req.params.id;

  const item = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!item) {
    return res
      .status(404)
      .json({ status: "fail", message: "No Item found" });
  }

  res
    .status(200)
    .json({ data: item, message: "Item updated successfully" });
});
