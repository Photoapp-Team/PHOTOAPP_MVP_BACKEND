const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  likes: {
    type: [
      {
        userId: {
          type: String,
        },
      },
    ],
  },
  tags: {
    type: [
      {
        type: String,
      },
    ],
  },
  location: {
    type: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
  },
});

const Photo = mongoose.model("photos", photoSchema);

module.exports = Photo;
