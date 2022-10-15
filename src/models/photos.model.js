const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  likes: {
    type: [
      {
        userId: String,
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
