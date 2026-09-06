const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware.js");

const verifyJWT = require("../middlewares/auth.middleware.js");

const {
  uploadProfileImages,
  getProfile,
} = require("../controllers/profileController.js");


// =============================
// UPLOAD BANNER + PROFILE PIC
// =============================

router.post(
  "/upload",
  verifyJWT,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  uploadProfileImages
);


// =============================
// GET PROFILE
// =============================

router.get("/", verifyJWT, getProfile);


module.exports = router;