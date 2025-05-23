const express = require("express");
const tasks = require("./tasks");

const app = express();
app.use(express.json()); // middleware

app.get("/", (req, res) => {
  res.json(tasks);
});

// parameter
app.get("/:id", (req, res) => {
  const task = tasks.find((task) => task.id == req.params.id);
  if (!task) {
    res.status(404).send({ message: "Task not found" });
  } else {
    res.json(task);
  }
});

app.post("/", (req, res) => {
  tasks.push(req.body);

  res.json({
    data: tasks,
  });
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
