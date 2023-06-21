const express = require("express");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const KEY = process.env.KEY;

const userRouter = express.Router();

// Middleware to hash the password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// User Registration
userRouter.post("/register", async (req, res) => {
  const { password, email, name, age } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      age,
      password: hashedPassword,
    });
    await user.save();
    res.send({ message: "User Registered Successfully" });
  } catch (error) {
    console.log({ Error: error.message });
    res.status(500).send({ Error: "Registration failed" });
  }
});

// User Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userID: user._id }, KEY);
        res.send({
          message: "Login Successful",
          token,
          user,
        });
      } else {
        res.status(401).send({ Error: "Wrong Credentials" });
      }
    } else {
      res.status(401).send({ Error: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(500).send({ Error: "Login failed" });
  }
});

// Update User Details
userRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newdata = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, newdata, {
      new: true,
    });
    res.send({ message: "User Details Updated", user: updatedUser });
  } catch (error) {
    res.status(500).send({ Error: "Update failed" });
  }
});

module.exports = { userRouter };
