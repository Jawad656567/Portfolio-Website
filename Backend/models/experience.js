const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  duration: String,
  responsibilities: [String],
}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);