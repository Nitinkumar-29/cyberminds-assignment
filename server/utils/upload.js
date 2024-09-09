const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cyberminds_assignment",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { quality: "auto", crop: "fill" },
      { fetch_format: "auto" },
    ],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
