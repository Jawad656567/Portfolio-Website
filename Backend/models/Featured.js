const mongoose = require("mongoose");

const FeaturedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  link: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Featured", FeaturedSchema);