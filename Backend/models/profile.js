import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  banner: {
    data: Buffer,
    contentType: String,
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);