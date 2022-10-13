const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  minPrice: {
    type: String,
  },
  maxPrice: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  displayPhotos: {
    type: [
      {
        type: String,
      },
    ],
  },
  photographerId: {
    type: String,
  },
  description: {
    type: String,
  },
  minQuantityPrevPhotos: {
    type: Number,
  },
  maxQuantityFinalPhotos: {
    type: Number,
  },
  deliveryTime: {
    type: String,
  },
  name: {
    type: String,
  },
});

const Package = mongoose.model("packages", packageSchema);

module.exports = Package;
