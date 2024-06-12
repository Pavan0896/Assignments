const express = require("express");
const fs = require("fs");
const auth = require("../middlewares/auth.middleware");

const todoRouter = express.Router();

const data = fs.readFileSync("db.json", "utf-8"); // read db.json
const parsedData = JSON.parse(data);

// to get todos
todoRouter.get("/todos", auth, (req, res) => {
  res.send(data);
});

// post todos
todoRouter.post("/todos", auth, (req, res) => {
  parsedData.todos.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Got the data");
});

// update todos using patch
todoRouter.patch("/todos/update-even", auth, (req, res) => {
  parsedData.todos.map((e) => {
    if (e.id % 2 == 0 && e.completed == false) {
      return (e.completed = true);
    }
  });
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Data updated");
});

// deleting completed todos
todoRouter.delete("/todos/delete-true", auth, (req, res) => {
  let newTodos = parsedData.todos.filter((e) => e.completed !== true);
  parsedData.todos = newTodos; // replace the existing todos array with new array
  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("Data of completed tasks deleted");
});

module.exports = todoRouter;
