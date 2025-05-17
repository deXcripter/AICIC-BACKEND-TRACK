## Node.js Beginner Exercises: `fs` and `http` Modules


---

### ✍️ Exercise 1: Save a Message to a File

**Goal:** Use `writeFileSync` to write user input to a file.

**Task:**
- Create a Node.js file named `saveMessage.js`.
- The file should write the text `"Welcome to Node.js!"` into a new file called `message.txt` using `fs.writeFileSync`.

**Expected Result:**
After running `node saveMessage.js`, a new file `message.txt` should be created with the content:
```
Welcome to Node.js!
```

---

### 📖 Exercise 2: Read and Show File Content

**Goal:** Use `readFileSync` to read file content and show it on the terminal.

**Task:**
- Create a file named `readMessage.js`.
- Make sure there's already a file called `message.txt` with some text in it.
- Use `fs.readFileSync` to read the file content and display it using `console.log`.

**Expected Output:**
```bash
node readMessage.js
```
Terminal shows:
```
Welcome to Node.js!
```

---

### 🌐 Exercise 3: Create a Basic HTTP Server that Sends File Content

**Goal:** Combine `http.createServer` with `fs.readFileSync`.

**Task:**
- Create a file named `server.js`.
- Create another file called `homepage.txt` with any welcome message.
- In `server.js`, create an HTTP server that:
  - Listens on port 3000.
  - Sends the content of `homepage.txt` as the response when someone visits `http://localhost:3000`.

**Expected Output in Browser:**
```
This is my first Node.js server!
```

---

These exercises let you get comfortable using Node.js to read/write files and serve content over HTTP without using custom functions or advanced syntax.
