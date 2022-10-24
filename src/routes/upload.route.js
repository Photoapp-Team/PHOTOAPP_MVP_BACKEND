const { request } = require("express");
const express = require("express");
const multer = require("multer");
const { s3Uploadv3, s3UploadProfile } = require("../lib/s3Service");
const { upload } = require("../middlewares/multiUploadImages.middleware");
const router = express.Router();
const app = express();
const uuid = require("uuid").v4;

router.post("/profile/:id", upload.array("file"), async (request, response) => {
  try {
    const { params } = request;
    const { id } = params;
    const results = await s3UploadProfile(request.files, id);
    return response.json({ status: "success" });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

//! Esto era para el manejo de errores, pero no jala,
//! necesito ver como manejarlos de manera adecuada para que no "truene" el back
// app.use((error, request, response, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return response.json({
//         message: "El archivo es demasiado grande",
//       });
//     }
//   }
//   if (error.code === "LIMIT_UNEXPECTED_FILE") {
//     return response.json({
//       message: "El archivo debe de ser de tipo imagen",
//     });
//   }
// });

module.exports = router;
