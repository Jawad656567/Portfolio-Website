const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  paragraphs: [
    {
      icon: String,
      text: String
    }
  ]
});

module.exports = mongoose.model("About", AboutSchema, "abouts");