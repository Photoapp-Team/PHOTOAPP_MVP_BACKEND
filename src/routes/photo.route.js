const { request, response, query } = require("express");
const express = require("express");
const {
    createPhoto,
    getPhoto,
    removePhotos,
    editPhotos,
    uploadPhoto,
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

module.exports = router;