const express = require("express");

const router = express.Router();

const {
  getProfileInfo,
  updateProfileInfo,
} = require("../controllers/profileInfoController.js");

// GET
router.get("/", getProfileInfo);

// UPDATE
router.put("/update", updateProfileInfo);

module.exports = router;