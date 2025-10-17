const express = require("express");
const fs = require("fs");

const app = express();
const posts = JSON.parse(fs.readFileSync("./dbs/posts.json", "utf8"));

// middleware
app.use(express.json());

// Controllers
const getAllPosts = (req, res) => {
  res.send(posts);
};

function createPost(req, res) {
  // a user account was created

  const newPost = req.body;
  newPost.id = posts.length + 1;

  posts.shift(newPost);

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
  });
}

function deletePost(req, res) {}
app.delete("/api/v1/posts/:id", (req, res) => {
  // Leave this for now
  res.status(501).json({ message: "Route not implemented" });
});

app.patch("/api/v1/posts/:id", (req, res) => {
  // Leave this for now
  res.status(501).json({ message: "Route not implemented" });
});

// Routes handlers
app.get("/api/v1/posts", getAllPosts);
app.post("/api/v1/posts", createPost);
app.get("/api/v1/posts/:id", getPost);

const port = 9000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}..`);
});
