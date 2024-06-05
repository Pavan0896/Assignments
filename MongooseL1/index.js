const express = require("express");
const connection = require("./config/db");
const userRouter = require("./Routes/user.route");

const port = 3000;
const server = express();
server.use(express.json());
server.use("/user", userRouter);

server.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running in port ${port} and db is also running`);
  } catch (error) {
    console.log(error);
  }
});
