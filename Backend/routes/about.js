const express = require("express");
const router = express.Router();
const About = require("../models/about");

// GET About Data
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE About Data (Admin Panel)
router.put("/", async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      // First-time create
      about = new About(req.body);
    } else {
      // Update existing
      about.paragraphs = req.body.paragraphs;
    }

    await about.save();

    res.json({ message: "About updated successfully", about });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;