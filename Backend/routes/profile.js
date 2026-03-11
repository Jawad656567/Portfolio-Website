import express from "express";
import multer from "multer";
import Profile from "../models/profile.js";

const router = express.Router();
const upload = multer(); // memory storage (Buffer me upload hota hai)

// Get profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Buffer ko Base64 me convert
    const bannerBase64 = profile.banner?.data.toString("base64");
    const profilePicBase64 = profile.profilePic?.data.toString("base64");

    res.json({
      banner: bannerBase64 ? `data:${profile.banner.contentType};base64,${bannerBase64}` : null,
      profilePic: profilePicBase64 ? `data:${profile.profilePic.contentType};base64,${profilePicBase64}` : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile (upload images)
router.put("/", upload.fields([{ name: "banner" }, { name: "profilePic" }]), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    if (req.files.banner) {
      profile.banner.data = req.files.banner[0].buffer;
      profile.banner.contentType = req.files.banner[0].mimetype;
    }

    if (req.files.profilePic) {
      profile.profilePic.data = req.files.profilePic[0].buffer;
      profile.profilePic.contentType = req.files.profilePic[0].mimetype;
    }

    await profile.save();
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;