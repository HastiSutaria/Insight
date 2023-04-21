const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images')); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Use the original file name
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};


const upload = multer({ storage, fileFilter: fileFilter });

module.exports = upload;
