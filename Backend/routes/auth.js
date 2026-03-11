const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

// LOGIN API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password); 

  try {
    const user = await User.findOne({ username });
    console.log("Found user:", user); 

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;