const http = require("http");
const fs = require("fs");
const url = require("url");

let posts = fs.readFileSync("./dbs/posts.json", "utf-8");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url)




  // Get all posts
  if (req.url === "/posts" && req.method === "GET") {
    res.end(posts);
    return;
  } else if (req.url === "/posts" && req.method === "POST") {
    let posts = fs.readFileSync("./dbs/posts.json", "utf-8");

    let body = "";

    req.on("data", (packet) => {
      body += packet.toString();
    });

    // When all data has been received
    req.on("end", () => {
      try {
        const existingPosts = JSON.parse(posts);
        const newPost = JSON.parse(body);
        const formattedPost = {
          id: existingPosts.length + 1,
          ...newPost,
        };
        existingPosts.push(formattedPost);

        fs.writeFileSync("./dbs/posts.json", JSON.stringify(existingPosts));


        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            message: "Post created successfully",
          })
        );
      } catch (error) {
        // Handle JSON parsing errors
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid JSON data",
          })
        );
      }
    });
  } else if (req.url === "/posts" && req.method === "GET") {

    console.log(req.params)

  }

  res.end("fallback")
});

server.listen(8000, () => {
  console.log("Server is litening on port 8000");
});
