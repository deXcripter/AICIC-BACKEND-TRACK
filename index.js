const http = require("http");
const url = require("url");
const tasks = require("./tasks");

// In-memory "database"
// let tasks = [
//   { id: 1, title: "Learn Node.js", completed: false },
//   { id: 2, title: "Build an API", completed: false },
// ];

// 1 -> Get individual tasks DONE
// 2. -> Create new tasks DONE
// 3. -> Getting all tasks DONE
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(req.method);

  // GET: /
  if (pathname == "/" && !query.id && req.method == "GET") {
    res.end(JSON.stringify(tasks));
  }
  // GET: /?id=
  else if (pathname == "/" && query && req.method == "GET") {
    const selectedTask = tasks.find((tk) => tk.id == query.id);

    if (!selectedTask) {
      res.statusCode = 404;
      res.end("No task found with this id");
    }

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

    res.end(`Task created successfully`);
  } else {
    res.statusCode = 404;
    res.end("This route doesn not exist on this server");
  }
});

server.listen(8080, () => {
  console.log("Server  is currently listening on port 8080");
});
