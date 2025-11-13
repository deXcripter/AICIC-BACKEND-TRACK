const mongoose = require("mongoose");
// import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    min: 100,
    max: 100000,
    required: true,
  },

  poster: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
