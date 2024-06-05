const express = require("express");
const UserModel = require("../Model/user.model");

const userRouter = express.Router();

userRouter.post("/data", async (req, res) => {
  let data = req.body;
  const user = new UserModel(data);
  await user.save();
  res.send("data received");
});

userRouter.get("/getData", async (req, res) => {
  try {
    const filter = req.query;
    let data = await UserModel.find(filter);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

userRouter.patch("/updateData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedData = await UserModel.findByIdAndUpdate({ _id: id }, body);
    res.status(200).send(updatedData);
  } catch (error) {
    res.status(404).send(error);
  }
});

userRouter.delete("/deleteData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const deletedData = await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).send(deletedData);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = userRouter;
