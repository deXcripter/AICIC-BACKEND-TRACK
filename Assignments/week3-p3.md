### TASK 1

**Concepts:** Arrays, Loops, `fs.writeFileSync`

**Task:**

- Create a script `saveNotes.js`.
- Inside it, create an array of strings:

  ```js
  const notes = ["Buy groceries", "Walk the dog", "Read Node.js docs"];
  ```

- Use a for loop to save each note to a new line in a file called notes.txt flie

Expected Result in notes.txt:

```bash
Buy groceries
Walk the dog
Read Node.js docs
```

Concepts: Functions, Loops, Conditionals, fs.readFileSync

### TASK 2

Create a file data.json with:

```typescript
[
  ({ name: "Frank", score: 85 },
  { name: "Favour", score: 72 },
  { name: "Dumebi", score: 90 }),
];
```

Create stats.js that:

- Reads the file with fs.readFileSync
- Parses the JSON and finds
  1. The average score
  2. The highest scoring user
  3. The lowest scoring user

`**PRO HINT**: Use JSON.parse(file) to parse files or strings`. [learn more about JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

Logs the result to the console.

**Expected Output:**

```bash
Average Score: 82.33
Top Scorer: Dumebi
Last Scorer: Favour
```

---

**Learn about Async JS & Github here**

- [Asynchronous javascript](https://youtu.be/OFpqvaJ3QYg?si=0MwiMm_xZ8_GtQ_7)
- [Quick into to git and github](https://youtu.be/iv8rSLsi1xo?si=M32jBkNN8tOzG76J)
