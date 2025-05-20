const http = require("http");
const url = require("url");
const fs = require("fs");

// In-memory "database"
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build an API", completed: false },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Clean path (remove leading/trailing slashes)
  const cleanPath = path.replace(/^\/+|\/+$/g, "");

  // Set response headers
  res.setHeader("Content-Type", "application/json");

  // Route handling
  if (cleanPath === "tasks") {
    if (method === "GET") {
      // GET /tasks - Get all tasks
      res.statusCode = 200;
      res.end(JSON.stringify(tasks));
    } else if (method === "POST") {
      // POST /tasks - Create a new task
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const newTask = JSON.parse(body); // turn the newTask to json
        newTask.id =
          tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
        tasks.push(newTask);

        fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 3));

        res.statusCode = 201;
        res.end(JSON.stringify(newTask));
      });
    }
  } else if (cleanPath.startsWith("tasks/")) {
    const taskId = parseInt(cleanPath.split("/")[1]);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Task not found" }));
    } else {
      if (method === "GET") {
        // GET /tasks/:id - Get a specific task
        res.statusCode = 200;
        res.end(JSON.stringify(tasks[taskIndex]));
      } else if (method === "PUT") {
        // PUT /tasks/:id - Update a task
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const updatedTask = JSON.parse(body);
          tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
          res.statusCode = 200;

          res.end(JSON.stringify(tasks[taskIndex]));
        });
      } else if (method === "DELETE") {
        // DELETE /tasks/:id - Delete a task
        tasks = tasks.filter((t) => t.id !== taskId);
        res.statusCode = 204;
        res.end();
      }
    }
  } else {
    // Handle 404
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
