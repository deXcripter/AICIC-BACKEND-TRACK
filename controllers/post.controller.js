const { Post } = require("../models/post.model");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  res.json({ posts });
}

async function createPost(req, res) {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).send({ post: newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Couldnt create post" });
  }
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "This post does not exist" });
  }

  res.send({
    post: post,
  });
}

function deletePost(req, res) {
  res.status(501).json({ message: "Route not implemented" });
}

async function updatePost(req, res) {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "" });
}

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
};
