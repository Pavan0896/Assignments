const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/registration", async (req, res) => {
  let { userName, email, password } = req.body;
  try {
    bcrypt.hash(password, 8, async (err, hash) => {
      const users = new UserModel({ userName, email, password: hash });
      await users.save();
      res.status(200).send("New Registration Success");
    });
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, async(err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              user: user.userName,
              email: user.email,
              password: user.password,
            },
            "masai",
            { expiresIn: "1h" }
          );
          res.status(200).send({ msg: "Login successful", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

module.exports = userRouter;
