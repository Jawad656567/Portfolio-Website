const express = require("express");
const router = express.Router();
const multer = require("multer");
const Profile = require("../models/profile");

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
      // Convert uploaded files to Base64
      const banner = req.files.banner
        ? `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`
        : null;

      const profilePic = req.files.profilePic
        ? `data:${req.files.profilePic[0].mimetype};base64,${req.files.profilePic[0].buffer.toString("base64")}`
        : null;

      // Find existing profile
      let profile = await Profile.findOne();

      // Agar profile exist nahi karta, new create karo
      if (!profile) {
        profile = new Profile({ banner, profilePic });
      } else {
        if (banner) profile.banner = banner;
        if (profilePic) profile.profilePic = profilePic;
      }

      await profile.save();

      res.json(profile);
    } catch (error) {
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

    // Agar profile null hai, ek default create karo
    if (!profile) {
      profile = new Profile({
        banner: null,
        profilePic: null,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;