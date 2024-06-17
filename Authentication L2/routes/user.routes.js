const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/user.middleware");
const blacklisted = require("../blacklist");
const userRouter = express.Router();

userRouter.post("/registration", async (req, res) => {
  let { userName, email, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      const users = new UserModel({ userName, email, password: hash });
      await users.save();
      res.status(200).send("New Registration Success");
    });
  } catch (error) {
    res.status(404).send("Something went wrong", error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const accessToken = jwt.sign(
            { email: user.email, userName: user.userName },
            "secret",
            { expiresIn: "15m" }
          );
          const refreshToken = jwt.sign(
            { email: user.email, userName: user.userName },
            "secretCode",
            { expiresIn: "1d" }
          );
          res.status(200).send({
            msg: "Login Successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res.send("Wrong password");
        }
      });
    } else {
      res.send("Something went wrong, email is incorrect");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

userRouter.get("/data", auth, (req, res) => {
  try {
    res.status(200).send("Private data");
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

userRouter.get("/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  blacklisted.push(token);
  res.status(200).send({ msg: "Logged out successfully" });
});

userRouter.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  jwt.verify(refreshToken, "secretCode", (err, decoded) => {
    const accessToken = jwt.sign(
      { user: decoded.userName, email: decoded.email },
      "secret",
      { expiresIn: "15m" }
    );
    res.send({accessToken});
  });
});

module.exports = userRouter;
