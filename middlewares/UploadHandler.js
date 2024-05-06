const multer = require("multer");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const id = Math.random();
    cb(null, id + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
