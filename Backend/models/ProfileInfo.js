const mongoose = require("mongoose");

const profileInfoSchema = new mongoose.Schema({
  name: String,
  semester: String,
  bio: String,
  description: String,
  location: String,
  education: String,
  university: String,
}, { timestamps: true });

module.exports = mongoose.model("ProfileInfo", profileInfoSchema);