const express = require("express");
const router = express.Router();
const multer = require("multer");

const Project = require("../models/Projects");
const uploadImage = require("../utils/cloudinary");

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// =============================
// ✅ GET ALL PROJECTS
// =============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// ✅ ADD PROJECT (WITH IMAGE)
// =============================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { description, liveLink } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // 🔥 Upload to Cloudinary
    const imageUrl = await uploadImage(req.file.buffer);

    const newProject = new Project({
      description,
      image: imageUrl,
      liveLink,
    });

    await newProject.save();

    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// =============================
// ✅ DELETE PROJECT
// =============================
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// ✅ UPDATE PROJECT
// =============================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { description, liveLink } = req.body;

    let updateData = {
      description,
      liveLink,
    };

    // Agar new image aaye to upload karo
    if (req.file) {
      const imageUrl = await uploadImage(req.file.buffer);
      updateData.image = imageUrl;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;