import express from "express";
import Education from "../models/education.js";

const router = express.Router();

// Get all education entries
router.get("/", async (req, res) => {
  try {
    const data = await Education.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new education entry
router.post("/", async (req, res) => {
  try {
    const edu = new Education(req.body);
    await edu.save();
    res.status(201).json(edu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update education entry
router.put("/:id", async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(edu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete education entry
router.delete("/:id", async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;