const { request } = require("express");
const express = require("express");
const { s3UploadProfile, s3UploadPackage, s3UploadSession } = require("../lib/s3Service");
const { upload, multiUpload } = require("../middlewares/uploadImages.middleware");
const { editPackage } = require("../usecases/packages.usecase");
const { editUser } = require("../usecases/user.usecase");
const router = express.Router();
const app = express();

router.post("/profile/:id", multiUpload, async (request, response) => {
  try {
    const { params } = request;
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadProfile(request.files, id);
    const userFieldsToUpdate = paramsS3.reduce((accum, paramS3) => {
      return {
        ...accum,
        [paramS3.fieldname]: `https://s3-fotofi-backend-profile-uploads.s3.amazonaws.com/${paramS3.Key}`,
      };
    }, {});
    const updatedUser = await editUser(id, userFieldsToUpdate);
    return response.json({ status: "success" });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/packages/:id", upload.array("displayPhotos"), async (request, response) => {
  try {
    const { params } = request;
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadPackage(request.files, id);
    const displayPhotos = paramsS3.reduce((accum, paramS3) => {
      return [
        ...accum,
        `https://s3-fotofi-backend-package-uploads.s3.amazonaws.com/${paramS3.Key}`,
      ];
    }, []);
    const updatedPackage = await editPackage(id, { displayPhotos });
    return response.json({ status: "success" });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/sessions/prev/:id", upload.array("files"), async (request, response) => {
  try {
    const { params } = request;
    const route = "prev";
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadSession(request.files, id, route);
    const previewPics = paramsS3.map((paramS3) => {
      return {
        link: `https://s3-fotofi-backend-session-uploads.s3.amazonaws.com/${paramS3.Key}`,
      };
    });
    // const updatedSession = await editSession(id, previewPics)
    return response.json({ status: "success" });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/sessions/final/:id", upload.array("files"), async (request, response) => {
  try {
    const { params } = request;
    const route = "final";
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadSession(request.files, id, route);
    const finalPics = paramsS3.map((paramS3) => {
      return {
        link: `https://s3-fotofi-backend-session-uploads.s3.amazonaws.com/${paramS3.Key}`,
      };
    });
    // const updatedSession = await editSession(id, finalPics)
    return response.json({ status: "success" });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
