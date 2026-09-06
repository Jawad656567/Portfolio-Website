const express = require("express");

const router = express.Router();

const {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController.js");

// GET all skills
router.get("/", getSkills);

// ADD new skill
router.post("/", addSkill);

// UPDATE skill
router.patch("/:id", updateSkill);

// DELETE skill
router.delete("/:id", deleteSkill);

module.exports = router;