const express = require("express");
const router = express.Router();
const multer = require("multer");
const Profile = require("../models/profile");

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary upload (buffer version)
const uploadImage = require("../utils/cloudinary");

// =============================
// UPLOAD BANNER + PROFILE PIC
// =============================
router.post(
  "/upload",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("FILES:", req.files); // 🔥 Debug

      let bannerUrl = null;
      let profilePicUrl = null;

      // Banner upload
      if (req.files?.banner?.[0]) {
        const file = req.files.banner[0];
        bannerUrl = await uploadImage(file.buffer); // ✅ buffer upload
      }

      // Profile Pic upload
      if (req.files?.profilePic?.[0]) {
        const file = req.files.profilePic[0];
        profilePicUrl = await uploadImage(file.buffer); // ✅ buffer upload
      }

      // Find existing profile
      let profile = await Profile.findOne();

      if (!profile) {
        profile = new Profile({ banner: bannerUrl, profilePic: profilePicUrl });
      } else {
        if (bannerUrl) profile.banner = bannerUrl;
        if (profilePicUrl) profile.profilePic = profilePicUrl;
      }

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error("Upload Route Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// =============================
// GET PROFILE
// =============================
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({
        banner: null,
        profilePic: null,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;