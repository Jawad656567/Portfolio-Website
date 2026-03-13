const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  banner: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Profile", profileSchema);