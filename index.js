const express = require("express");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

const app = express();

// middleware
app.use(express.json()); // parses the incoming payload in the request

// Routes handlers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = 9000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}..`);
});
