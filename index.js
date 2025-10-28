const express = require("express");
const morgan = require("morgan");
const mongnoose = require("mongoose");

const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const { default: mongoose } = require("mongoose");

const app = express();

// middleware
app.use(express.json()); // parses the incoming payload in the request
app.use(morgan("dev"));

// Routes handlers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = 9000;
app.listen(port, async () => {
  await mongoose.connect(
    `mongodb+srv://indisputablejay_db_user:vsaZopQT7QpCiFXZ@maincluster.7csm9cf.mongodb.net/test?appName=MainCluster`
  );

  console.log(`Server is listening on ${port}..`);
});
