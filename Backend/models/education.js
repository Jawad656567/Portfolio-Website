const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    short: {
      type: String,
    },
    institute: {
      type: String,
    },
    period: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    field: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);