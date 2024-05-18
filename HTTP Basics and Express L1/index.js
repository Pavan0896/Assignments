const express = require("express");
const fs = require("fs");

const server = express();

const data = fs.readFileSync("db.json", "utf-8"); // read db.json
const parsedData = JSON.parse(data); 

server.use(express.json());

// to get todos
server.get("/todos", (req, res) => {
  res.send(data);
});

// post todos
server.post("/todos", (req, res) => {
  parsedData.todos.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Got the data");
});


// update todos using patch
server.patch("/todos/update-even", (req, res) => {
  parsedData.todos.map((e) => {
    if (e.id % 2 == 0 && e.completed == false) {
      return (e.completed = true);
    }
  });
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Data updated");
});

// deleting completed todos
server.delete("/todos/delete-true", (req, res) => {
  let newTodos = parsedData.todos.filter((e) => e.completed !== true);
  parsedData.todos = newTodos; // replace the existing todos array with new array
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Data of completed tasks deleted");
});

server.listen(8080, () => {
  console.log("Server is running in port 8080");
});
