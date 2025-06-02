const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: String,
  price: { type: Number, min: 1000 },
  description: String,
  category: {
    type: String,
    enum: ["books", "electronics", "furniture"],
    required: true,
  },
  condition: {
    type: String,
    enum: ["new", "used", "damaged"],
    required: true,
    default: "used",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", ListingSchema); // model

module.exports = Listing;
