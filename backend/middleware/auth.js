// ...other requires
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;  // <-- username is required
  try {
    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already taken" });
    }
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    // Save user
    const user = new User({ username, email, password: hash });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});
