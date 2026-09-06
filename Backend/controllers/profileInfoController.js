const ProfileInfo = require("../models/ProfileInfo");

// GET Profile Info
const getProfileInfo = async (req, res) => {
  try {
    const data = await ProfileInfo.findOne();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// UPDATE Profile Info
const updateProfileInfo = async (req, res) => {
  try {
    const updated = await ProfileInfo.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getProfileInfo,
  updateProfileInfo,
};