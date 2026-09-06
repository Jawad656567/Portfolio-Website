const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware.js");

const {
  getFeatured,
  createFeatured,
  updateFeatured,
  deleteFeatured,
} = require("../controllers/featuredController.js");

// GET all featured items
router.get("/", getFeatured);

// CREATE new featured item
router.post("/", upload.single("image"), createFeatured);

// UPDATE featured item
router.put("/:id", upload.single("image"), updateFeatured);

// DELETE featured item
router.delete("/:id", deleteFeatured);

module.exports = router;