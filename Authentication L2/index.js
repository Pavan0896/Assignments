const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`Server is running on port ${process.env.PORT}`);
});
