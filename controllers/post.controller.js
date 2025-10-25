const fs = require("fs");
const posts = JSON.parse(fs.readFileSync("./dbs/posts.json", "utf8"));

function getAllPosts(req, res) {
  // res.send
  // res.json
  res.json({ posts, time: req.currentTime || null });
}

function createPost(req, res) {
  // a user account was created

  const newPost = req.body;
  newPost.id = posts.length + 1;

  posts.push(newPost);

  fs.writeFileSync("./dbs/posts.json", JSON.stringify(posts));

  res.status(201).send(newPost);
}

function getPost(req, res) {
  const identifier = parseInt(req.params.id);

  if (identifier > posts.length) {
    return res.status(404).json({ message: "This post does not exist" });
  }

  const post = posts.find((elem) => elem.id === identifier);

  res.send({
    post: post,
    date: req.currentTime,
  });
}

function deletePost(req, res) {
  res.status(501).json({ message: "Route not implemented" });
}

function updatePost(req, res) {
  // Leave this for now
  res.status(501).json({ message: "Route not implemented" });
}

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
};
