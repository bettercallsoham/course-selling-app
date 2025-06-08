const express = require("express");
const cors = require("cors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");   
const User = require("../models/User");
const secret_key = process.env.secret_key;

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);  
    const user = new User({ email, password: hash });

    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    res.status(400).json({ message: "User already exists!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials!" });

  const match = await bcrypt.compare(password, user.password);  
  if (!match) return res.status(400).json({ message: "Invalid credentials!" });

  const token = jwt.sign({ email }, secret_key, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
