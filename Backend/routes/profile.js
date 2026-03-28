const express = require("express");
const router = express.Router();
const multer = require("multer");
const Profile = require("../models/profile");

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

//cloudinary
const uploadImage = require("../utils/cloudinary");
const fs = require("fs");

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
      console.log("FILES:", req.files);   // 🔥 ADD THIS
      // Convert uploaded files to Base64
      let bannerUrl = null;
      let profilePicUrl = null;

      // Banner upload
     if (req.files && req.files.banner) {
        const file = req.files.banner[0];
        const path = `uploads/${Date.now()}-${file.originalname}`;

       
      }

      // Profile pic upload
      if (req.files.profilePic) {
        const file = req.files.profilePic[0];
        const path = `uploads/${Date.now()}-${file.originalname}`;

        fs.writeFileSync(path, file.buffer);
        profilePicUrl = await uploadImage(path);
        fs.unlinkSync(path);
      }

      // Find existing profile
      let profile = await Profile.findOne();

      // Agar profile exist nahi karta, new create karo
      if (!profile) {
       profile = new Profile({ banner: bannerUrl, profilePic: profilePicUrl });
      } else {
     if (bannerUrl) profile.banner = bannerUrl;
if (profilePicUrl) profile.profilePic = profilePicUrl;
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