import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  short: { type: String, required: true },
  institute: { type: String, required: true },
  period: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  field: { type: String, required: true },
  status: { type: String, enum: ["ongoing", "completed"], required: true },
}, { timestamps: true });

export default mongoose.model("Education", EducationSchema);