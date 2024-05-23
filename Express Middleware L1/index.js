const express = require("express");
const fs = require("fs");

const server = express();
server.use(express.json());
const todos = fs.readFileSync("db.json", "utf-8");
const parsedTodos = JSON.parse(todos);

const middleware = (req, res, next) => {
  //destructure of req.body
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  //validating each field
  if (typeof ID !== "number") {
    res.status(400).send("bad request. some data is incorrect. ");
    fs.appendFileSync("res.txt", "\n ID should be a number."); 
  } else if (typeof Name !== "string") {
    res.status(400).send("bad request. some data is incorrect.");
    fs.appendFileSync("res.txt", "\n Name should be a string.");
  } else if (typeof Rating !== "number") {
    res.status(400).send("bad request. some data is incorrect.");
    fs.appendFileSync("res.txt", "\n Rating should be a number.");
  } else if (typeof Description !== "string") {
    res.status(400).send("bad request. some data is incorrect. ");
    fs.appendFileSync("res.txt", "\n Description should be a string.");
  } else if (typeof Genre !== "string") {
    res.status(400).send("bad request. some data is incorrect.");
    fs.appendFileSync("res.txt", "\n Genre should be a string.");
  } else if (typeof Cast !== "object") {
    res.status(400).send("bad request. some data is incorrect.");
    fs.appendFileSync("res.txt", "\n Cast should be an array of strings.");
  } else {
    next(); // if all validations pass
  }
};

server.use(middleware);

server.post("/", (req, res) => {
  parsedTodos.todos.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(parsedTodos));
  res.status(200).send("data received");
});

server.listen(3000, () => {
  console.log("Server is running");
});
