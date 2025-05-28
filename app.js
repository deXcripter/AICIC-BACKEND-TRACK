const express = require("express");
const app = express();

const { listingRoute } = require("./routes/listing.route");

app.use("/api/v1/listings", listingRoute);

module.exports = app;
