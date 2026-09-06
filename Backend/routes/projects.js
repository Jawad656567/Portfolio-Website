const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware.js");

const {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController.js");

// GET ALL PROJECTS
router.get("/", getProjects);

// ADD PROJECT
router.post("/", upload.single("image"), addProject);

// DELETE PROJECT
router.delete("/:id", deleteProject);

// UPDATE PROJECT
router.put("/:id", upload.single("image"), updateProject);

module.exports = router;