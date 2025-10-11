const express = require("express");
const fs = require("fs");

const posts = fs.readFileSync('./dbs/posts.json', 'utf8')

const app = express()


app.use(express.json())

// GET /posts
app.get('/posts', (req, res) => {
    res.send(posts)
})

// POST /posts
app.post('/posts', (req, res) => {
    const body = req.body;
    const data = (JSON.parse(posts))
    body.id = data.length + 1;
    data.push(body)



    fs.writeFileSync('./dbs/posts.json', JSON.stringify(data))
    
    
    res.send("anything")
})

app.get("/posts/:id", (req, res) => {
    console.log(req.params)
    res.send("Okay")
})


app.listen(8000, () => {
    console.log(`Server is listening on port 8000!`)
})