const express = require("express");
const router = express.Router();

const {
  getAbout,
  updateAbout,
} = require("../controllers/aboutController.js");

// GET About
router.get("/", getAbout);

// UPDATE About
router.put("/", updateAbout);

module.exports = router;