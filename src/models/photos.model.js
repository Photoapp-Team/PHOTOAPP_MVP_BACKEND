const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  info: {
    type: [
      {
        url: {
          type: String,
        },
        createdBy: {
          type: String,
        },
        likes: {
          type: [
            {
              type: String,
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
          type: String,
        },
      },
    ],
  },
});

const Photo = mongoose.model("photos", photoSchema);

module.exports = Photo;
