const express = require("express");

const router = express.Router();

const {
  getExperience,
  createOrUpdateExperience,
} = require("../controllers/experienceController.js");

// GET latest experience
router.get("/", getExperience);

// CREATE OR UPDATE experience
router.post("/", createOrUpdateExperience);

module.exports = router;