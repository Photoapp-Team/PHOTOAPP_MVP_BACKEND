const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (request, file, cb) => {
  // if (file.fieldname === )
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(console.log("error"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000000000 },
});

const multiUpload = upload.fields([
  { name: "profilePic" },
  { name: "coverPhoto" },
]);

module.exports = { multiUpload, upload };
