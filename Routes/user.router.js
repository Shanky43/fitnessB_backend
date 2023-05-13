const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email, password, name, age, gender, primaryGoal, typicalDay, currentWeight, PHeight, goalWeight } = req.body;

  try {
    const existingUser = await userModel.findOne({ email, name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new userModel({
        email,
        password: hash,
        name,
        age,
        gender,
        equipment: primaryGoal,
        currentWeight,
        goalWeight,
        userHeight: PHeight,
        typicalDay
      });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
      if (err) { res.status(201).json({ err: err }); }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, userName: user.name },
            "fitnessB"
          );
          console.log(result, user, token);
          res
            .status(200)
            .json({
              message: "Login Sucessful",
              token,
              userName: user.name,
              userId: user._id,
            });
          if (err) { res.status(201).json({ err }) }
        } else {
          res.status(401).json({ message: "Wrong Credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = { userRouter };
