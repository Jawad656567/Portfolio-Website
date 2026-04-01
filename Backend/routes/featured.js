const express = require("express");
const router = express.Router();
const multer = require("multer");
const Featured = require("../models/Featured");
const uploadImage = require("../utils/cloudinary");

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GET all featured items
router.get("/", async (req, res) => {
  try {
    const items = await Featured.find().sort({ created_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE featured item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const item = await Featured.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (req.body.title) item.title = req.body.title;
    if (req.body.description) item.description = req.body.description;
    if (req.body.link) item.link = req.body.link;

    // Image update
    if (req.file) {
      const imageUrl = await uploadImage(req.file.buffer);
      item.image_url = imageUrl;
    }

    item.updated_at = Date.now();

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE featured item
router.delete("/:id", async (req, res) => {
  try {
    await Featured.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;