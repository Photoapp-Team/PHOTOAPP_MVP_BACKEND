const { request } = require("express");
const express = require("express");
const {
  s3UploadProfile,
  s3UploadPackage,
  s3UploadSession,
  s3UploadProfilePics,
} = require("../lib/s3Service");
const {
  upload,
  multiUpload,
  multiUploadPackage,
} = require("../middlewares/uploadImages.middleware");
const { editPackage } = require("../usecases/packages.usecase");
const { editUser } = require("../usecases/user.usecase");
const { editSession } = require("../usecases/sessions.usecase");
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
    return response.json({ status: "success", updatedUser });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/displayPics/:id", upload.array("displayPics"), async (request, response) => {
  try {
    const { params } = request;
    const route = "displayPics";
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadProfilePics(request.files, id, route);
    const displayPics = paramsS3.map((paramS3) => {
      const name = paramS3.Key.split("/").reverse();
      return `https://s3-fotofi-backend-profile-uploads.s3.amazonaws.com/${paramS3.Key}`;
    });
    const updatedUser = await editUser(id, { displayPics });
    return response.json({ status: "success", updatedUser });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/packages/:id", multiUploadPackage, async (request, response) => {
  try {
    const { params } = request;
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadPackage(request.files, id);
    const displayPhotos = paramsS3.reduce((accum, paramS3) => {
      if (paramS3.fieldname === "coverPhoto") {
        return {
          ...accum,
          [paramS3.fieldname]: `https://s3-fotofi-backend-package-uploads.s3.amazonaws.com/${paramS3.Key}`,
        };
      }
      return {
        ...accum,
        [paramS3.fieldname]: [
          ...(accum[paramS3.fieldname] ? accum[paramS3.fieldname] : []),
          `https://s3-fotofi-backend-package-uploads.s3.amazonaws.com/${paramS3.Key}`,
        ],
      };
    }, {});

    const updatedPackage = await editPackage(id, { ...displayPhotos });
    return response.json({ status: "success", updatedPackage });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/sessions/prev/:id", upload.array("previewPics"), async (request, response) => {
  try {
    const { params } = request;
    const route = "prev";
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadSession(request.files, id, route);
    const previewPics = paramsS3.map((paramS3) => {
      const name = paramS3.Key.split("/").reverse();
      return {
        link: `https://s3-fotofi-backend-session-uploads.s3.amazonaws.com/${paramS3.Key}`,
        name: name[0],
      };
    });
    const updatedSession = await editSession(id, { previewPics });
    return response.json({ status: "success", updatedSession });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/sessions/final/:id", upload.array("finalPics"), async (request, response) => {
  try {
    const { params } = request;
    const route = "final";
    const { id } = params;
    const { s3ObjectResponse, paramsS3 } = await s3UploadSession(request.files, id, route);
    const finalPics = paramsS3.map((paramS3) => {
      const name = paramS3.Key.split("/").reverse();
      return {
        link: `https://s3-fotofi-backend-session-uploads.s3.amazonaws.com/${paramS3.Key}`,
        name: name[0],
      };
    });
    const updatedSession = await editSession(id, { finalPics });
    return response.json({ status: "success", updatedSession });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
