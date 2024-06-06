const express = require("express");
const connection = require("./Config/db");
const movieRouter = require("./Routes/movies.route");

const server = express();
server.use(express.json());
server.use("/movies", movieRouter);

server.listen(3000, async () => {
  await connection;
  console.log("Server is running and server is connected");
});
