const express = require("express");

const app = express();

let tasks = [
  { id: 1, title: "Learn No   de.js", completed: false },
  { id: 2, title: "Build an API", completed: false },
];

app.get("/", (req, res) => {
  res.json(tasks);
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
