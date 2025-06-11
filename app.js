const express = require("express");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./controller/error.controller");

const { listingRoute } = require("./routes/listing.route");
const { userRoute } = require("./routes/users.routes");
const AppError = require("./utils/appError");
const { authRoute } = require("./routes/auth.route");

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/listings", listingRoute);
app.use("/api/v1/users", userRoute);
app.use((req, res, next) => {
  // const message = `This route ${req.method}: ${req.url} does not exist on this server`;
  // const err = new Error(message);
  // err.statusCode = 404;
  // next(err);

  next(
    new AppError(
      `This route ${req.method}: ${req.url} does not exist on this server`,
      404
    )
  );
});

// global errror handler
app.use(errorHandler.gloablErrorHandler);

module.exports = app;
