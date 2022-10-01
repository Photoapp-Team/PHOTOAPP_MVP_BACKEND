const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  photographerId: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
  },
  userId: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
  },
  name: {
    type: String,
  },
  previewPics: {
    type: [
      {
        link: {
          type: String,
        },
        isChecked: {
          type: Boolean,
          default: false,
        },
        name: {
          type: String,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  finalPics: {
    type: [
      {
        link: {
          type: String,
        },
        comment: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  downloadLink: {
    type: String,
  },
  setFinalPics: {
    type: Number,
  },
  isPayed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  package: {
    type: String,
  },
  status: {
    type: [
      {
        type: String,
      },
    ],
  },
  closedAt: {
    type: String,
  },
});

const Session = mongoose.model("sessions", sessionSchema);

module.exports = Session;
