const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: {
    type: String,
    enum: "books" | "electronics" | "furniture",
  },
  condition: {
    type: String,
    enum: "new" | "used" | "damaged",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", ListingSchema); // model

module.exports = Listing;
