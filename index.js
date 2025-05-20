const http = require("http");
const url = require("url");

// In-memory "database"
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build an API", completed: false },
];

// 1 -> Get individual tasks DONE
// 2. -> Create new tasks
// 3. -> Getting all tasks DONE
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(req.method);

  if (pathname == "/" && !query.id && req.method == "GET") {
    res.end(JSON.stringify(tasks));
  } else if (pathname == "/" && query && req.method == "GET") {
    const selectedTask = tasks.find((tk) => tk.id == query.id);
    console.log(selectedTask);
    res.end(JSON.stringify(selectedTask));
  } else if (pathname == "/" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => {
      body += data.toString();
    });

    req.on("end", () => {
      const newTask = JSON.parse(body);
      tasks.push(newTask);
      res.end(JSON.stringify(tasks));
    });

    res.end("You are trying to create a new task");
  } else {
    res.statusCode = 404;
    res.end("This route doesn not exist on this server");
  }
});

server.listen(8080, () => {
  console.log("Server  is currently listening on port 8080");
});
