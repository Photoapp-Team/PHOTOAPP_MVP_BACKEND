const Photo = require("../models/photos.model");

const uploadPhoto = async (photoData) => {
    const photo = Photo.create({ ...photoData });
    return photo;
};

const getPhoto = (id) => {
    const photo = Photo.findById(id);
    return photo;
};

const editPhoto = (id, photoData) => {
    const editedPhoto = Photo.findByIdAndUpdate(id, photoData, {
        returnDocument: "after",
    });
    return editedPhoto;
};

module.exports = {
    uploadPhoto,
    getPhoto,
    editPhoto,
}