const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (request, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_FILE_SIZE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000000000 },
  files: 2,
});

const multiUpload = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

module.exports = { multiUpload, upload };
