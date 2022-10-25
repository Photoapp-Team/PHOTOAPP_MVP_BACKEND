const mongoose = require("mongoose");
const { Schema } = mongoose;

const packageSchema = new mongoose.Schema({
  minPrice: {
    type: String,
    required: true,
  },
  maxPrice: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  displayPhotos: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
  photographerId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minQuantityPrevPhotos: {
    type: Number,
    required: true,
  },
  maxQuantityPrevPhotos: {
    type: Number,
    required: true,
  },
  minQuantityFinalPhotos: {
    type: Number,
    required: true,
  },
  maxQuantityFinalPhotos: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: String,
    required: true,
  },
});

const Package = mongoose.model("packages", packageSchema);

module.exports = Package;
