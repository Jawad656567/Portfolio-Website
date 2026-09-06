const multer = require("multer");

// Multer setup - memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

module.exports = upload;