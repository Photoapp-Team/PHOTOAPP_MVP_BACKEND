const Photo = require("../models/photos.model");

const uploadPhoto = async (photoData) => {
    const photo = Photo.create({ ...photoData });
    return photo;
};

const getPhoto = (id) => {
    const photo = Photo.findById(id);
    return photo;
};

module.exports = {
    uploadPhoto,
    getPhoto,
}