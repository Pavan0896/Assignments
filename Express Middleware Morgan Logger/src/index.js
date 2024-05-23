const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const server = express();
const logPath = path.join(__dirname, "access.log");
server.use(express.json());

const middleware = (req, res, next) => {
  req._startTime = Date.now();
  next();
  morgan.token("date", () => new Date().toISOString());
  morgan.token("http-version", (req) => req.httpVersion);
  morgan.token("time-taken", (req, res) => {
    return Date.now() - req._startTime + "ms";
  });
};

const logFormat =
  ":method :status :res[content-length] - :time-taken :date HTTP/:http-version :url\n";
const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });

server.use(morgan(logFormat, { stream: accessLogStream }));

server.use(middleware);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to home page.");
});

server.get("/get-users", (req, res) => {
  res.status(200).json([
    { id: 1, name: "User1" },
    { id: 2, name: "User2" },
    { id: 3, name: "User3" },
  ]);
});

server.post("/add-user", (req, res) => {
  res.status(201).send("User added successfully");
});

server.put("/user/:id", (req, res) => {
  res.status(201).send(`User with ID ${req.params.id} is updated successfully`);
});

server.delete("/user/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} is deleted successfully`);
});

server.listen(3000, () => {
  console.log("Server is running");
});
