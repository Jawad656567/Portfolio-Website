const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier"); // npm install streamifier

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// buffer upload
const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio_images" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadImage;