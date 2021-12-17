const multer = require("multer");

const UPLOAD_DESTINATION = "./public/uploads/";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOAD_DESTINATION);
  },
  filename: (req, file, callback) => {
    const { id } = req.body;
    callback(null, id + "--" + file.originalname);
  },
});

module.exports = multer({ storage: fileStorageEngine });
