const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// "User" = model name
// "users" = exact collection name in MongoDB
module.exports = mongoose.model("User", userSchema, "users");