const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ["Frontend", "Backend", "Tools"], required: true },
    learning: { type: Boolean, default: false },
    order: { type: Number, default: 0 }, // optional for sorting
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", SkillSchema);