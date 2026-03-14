const mongoose = require("mongoose");

const paragraphSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  text: { type: String, required: true }
});

const aboutSchema = new mongoose.Schema({
  paragraphs: [paragraphSchema]
});

module.exports = mongoose.model("About", aboutSchema);