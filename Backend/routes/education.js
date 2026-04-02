const express = require("express");
const router = express.Router();
const Education = require("../models/education");

// ✅ GET all education
router.get("/", async (req, res) => {
  try {
    const data = await Education.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ ADD education
router.post("/", async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    const saved = await newEdu.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE education
router.put("/:id", async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE education
router.delete("/:id", async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;