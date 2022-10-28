const { request, response, query } = require("express");
const express = require("express");
const {
    uploadPhoto,
    getPhoto,
    removePhoto,
    editPhoto,
} = require("../usecases/photos.usecase");
const { auth, verifyUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, async (request, response) => {
    const { body } = request;
    try {
        const uploadedPhoto = await uploadPhoto(body);
        response.status(201);
        response.json({
            success: true,
            data: { uploadedPhoto },
        });
    } catch (error) {
        response.status(error.status || 400);
        response.json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const { params } = request;
        const photo = await getPhoto(params.id);
        response.json({
            success: true,
            data: {
                photo: photo,
            },
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.massage,
        });
    }
});

router.patch("/:id", auth, verifyUser, async (request, response) => {
    try {
        const { params, body } = request;
        const photo = await editPhoto(params.id, body);
        response.json({
            success: true,
            data: {
                photo,
            },
            message: "Successfully edited photo",
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.message,
        });
    }
});

router.delete("/:id" , auth, async (request, response) => {
    try {
        const { params } = request;
        const photo = await removePhoto(params.id);
        response.json({
            success: true,
            message: "Photo deleted successfully"
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;