// utils/cloudinary.js

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image from buffer
const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio_images" }, // folder in Cloudinary
      (error, result) => {
        if (result) {
          console.log("Uploaded Image URL:", result.secure_url);
          resolve(result.secure_url);
        } else {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadImage;