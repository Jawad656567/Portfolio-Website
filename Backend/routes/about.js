const express = require("express");
const router = express.Router();
const About = require("../models/about");

// GET About
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE About
router.put("/", async (req, res) => {
  try {
    const { paragraphs } = req.body;

    // Remove _id from each paragraph before saving
    const cleanParagraphs = paragraphs.map(p => ({
      icon: p.icon,
      text: p.text
    }));

    let about = await About.findOne();

    if (!about) {
      about = new About({ paragraphs: cleanParagraphs });
    } else {
      about.paragraphs = cleanParagraphs;
    }

    await about.save();

    res.json({ message: "About updated successfully", about });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});