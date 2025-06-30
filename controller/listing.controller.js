const Listing = require("../models/listing.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");

exports.createListing = asyncHandler(async (req, res, next) => {
  // const newListing = await Listing.create(req.body);
  const schema = joi.object({
    price: joi.number().min(0).required(),
    title: joi.string().required(),
    description: joi.string().required().min(8),
    category: joi.string().required(),
    condition: joi.string(),
  });
  // .min(1, "You must specify at least one field");

  const { value, error } = schema.validate(req.body);
  if (error) {
    return next(new AppError(error.message, 400));
  }

  value.userId = req.user._id;

  const listing = await Listing.create(value);

  res.json({
    data: listing,
    message: "You have successfully created a product for listing",
  });
});

exports.getAllListings = asyncHandler(async (req, res, next) => {
  const { title, minPrice, maxPrice } = req.query;
  const filter = {};

  if (title) {
    // Use a regular expression for case-insensitive partial matching on the title
    filter.title = { $regex: title, $options: "i" };
  }

  // Handle price range filtering
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const listings = await Listing.find(filter).select(
    "-createdAt -userId -description -__v"
  );
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

  const listing = await Listing.findOne({ _id: id }).populate(
    "userId"
  );
  if (!listing)
    return next(new AppError("Listing does not exist", 404));
  else {
    res.json({ message: "Listing found", data: listing });
  }
});

exports.deleteListingById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const list = await Listing.findOne({ _id: id });
  if (!list) {
    next(new AppError("No item found", 404));
  }

  if (list.userId.toString() !== req.user._id.toString()) {
    return next(
      new AppError(
        "You are not authorized to perfrom this aciton",
        403
      )
    );
  }

  if (list.userId) await list.deleteOne();
  res.status(200).json({ message: "Item deleted successfully" });
});

exports.updateListById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const item = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!item) {
    return next(new AppError("No Item found", 404));
  }

  await item.save();

  res
    .status(200)
    .json({ data: item, message: "Item updated successfully" });
});
