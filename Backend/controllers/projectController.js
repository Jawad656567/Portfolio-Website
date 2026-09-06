const Project = require("../models/Projects");
const uploadImage = require("../utils/cloudinary");

// GET ALL PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ADD PROJECT
const addProject = async (req, res) => {
  try {
    const { description, liveLink } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    // Upload image to Cloudinary
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

    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const { description, liveLink } = req.body;

    let updateData = {
      description,
      liveLink,
    };

    // Agar new image aaye to Cloudinary par upload karo
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
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
};