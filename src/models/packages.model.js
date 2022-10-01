const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  price: {
    type: String,
  },
  photographerId: {
    type: String,
  },
  description: {
    type: String,
  },
  quantityPrevPhotos: {
    type: Number,
  },
  quantityFinalPhotos: {
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
