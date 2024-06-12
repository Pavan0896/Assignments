const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
const dotenv = require("dotenv")
dotenv.config();

const server = express();
server.use(express.json());
server.use("/user", userRouter);
server.use("/todo", todoRouter);

server.listen(process.env.PORT, async () => {
  await connection;
  console.log(`Server is running in port ${process.env.PORT} and mongoDB is also connected`);
});
