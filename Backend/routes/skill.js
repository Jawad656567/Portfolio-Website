const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");

// GET all skills grouped by category
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    const grouped = { Frontend: [], Backend: [], Tools: [] };

    skills.forEach(skill => {
      grouped[skill.category].push({
        _id: skill._id,
        name: skill.name,
        learning: skill.learning
      });
    });

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST new skill
router.post("/", async (req, res) => {
  try {
    const { name, category, learning } = req.body;
    const newSkill = new Skill({ name, category, learning });
    await newSkill.save();
    res.status(201).json({ message: "Skill added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH update skill
router.patch("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    Object.assign(skill, req.body);
    await skill.save();
    res.json({ message: "Skill updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE skill
router.delete("/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;