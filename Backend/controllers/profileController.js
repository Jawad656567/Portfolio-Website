const Profile = require("../models/profile");
const uploadImage = require("../utils/cloudinary");

// =============================
// UPLOAD BANNER + PROFILE PIC
// =============================
const uploadProfileImages = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    let bannerUrl = null;
    let profilePicUrl = null;

    // Banner upload
    if (req.files?.banner?.[0]) {
      const file = req.files.banner[0];

      bannerUrl = await uploadImage(file.buffer);
    }

    // Profile Pic upload
    if (req.files?.profilePic?.[0]) {
      const file = req.files.profilePic[0];

      profilePicUrl = await uploadImage(file.buffer);
    }

    // Find existing profile
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({
        banner: bannerUrl,
        profilePic: profilePicUrl,
      });
    } else {
      if (bannerUrl) {
        profile.banner = bannerUrl;
      }

      if (profilePicUrl) {
        profile.profilePic = profilePicUrl;
      }
    }

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error("Upload Profile Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// =============================
// GET PROFILE
// =============================
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    res.json(profile || { banner: null, profilePic: null });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  uploadProfileImages,
  getProfile,
};
