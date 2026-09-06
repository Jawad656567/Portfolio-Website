const express = require("express");

const router = express.Router();

const {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

// GET all education
router.get("/", getEducation);

// ADD education
router.post("/", addEducation);

// UPDATE education
router.put("/:id", updateEducation);

// DELETE education
router.delete("/:id", deleteEducation);

module.exports = router;