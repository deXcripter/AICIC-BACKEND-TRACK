const express = require("express");
const {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} = require("../controllers/post.controller");

const postRouter = express.Router();

// api/v1/posts
postRouter.route("/").get(getAllPosts).post(createPost);
postRouter.route("/:id").get(getPost).delete(deletePost).patch(updatePost);

module.exports = postRouter;
