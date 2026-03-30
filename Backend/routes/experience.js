const express = require("express");
const router = express.Router();
const Experience = require("../models/experience");

// GET (latest record)
router.get("/", async (req, res) => {
  try {
    const data = await Experience.findOne().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (create new OR update existing)
router.post("/", async (req, res) => {
  try {
    const existing = await Experience.findOne();

    if (existing) {
      // UPDATE
      existing.role = req.body.role;
      existing.company = req.body.company;
      existing.duration = req.body.duration;
      existing.responsibilities = req.body.responsibilities;

      await existing.save();
      return res.json({ message: "Updated successfully" });
    }

    // CREATE
    const newData = new Experience(req.body);
    await newData.save();

    res.json({ message: "Created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;