
// utils/cloudinary.js

const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "portfolio_images", // optional folder name in Cloudinary
    });
    console.log("Uploaded Image URL:", result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};

module.exports = uploadImage;

