const express = require("express");
const morgan = require("morgan");
const app = express();

const { listingRoute } = require("./routes/listing.route");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/listings", listingRoute);
app.use((req, res) =>
  res.status(404).json({
    message: `This route ${req.method}: ${req.url} does not exist on this server`,
  })
);

module.exports = app;
