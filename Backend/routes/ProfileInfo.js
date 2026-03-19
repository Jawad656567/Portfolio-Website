const express = require("express");
const ProfileInfo = require("../models/ProfileInfo");

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const data = await ProfileInfo.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/update", async (req, res) => {
  try {
    const updated = await ProfileInfo.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;