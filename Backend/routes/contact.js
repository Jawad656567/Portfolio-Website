const express = require("express");
const router = express.Router();

const {
  sendContactEmail,
} = require("../controllers/contactController.js");

// POST Contact Form
router.post("/", sendContactEmail);

module.exports = router;