const express = require("express");
const morgan = require("morgan");
const {
  getAllCards,
  createCard,
  getSingleCardById,
  routeNotFount,
} = require("./controller/card.controller");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("👋 Hello from the middleware");
  next();
});

// ROUTES
app.route("/api/v1/cards").get(getAllCards).post(createCard);
app.get("/api/v1/cards/:id", getSingleCardById);
app.use(routeNotFount);

// server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is currently listening ${port}`);
});
