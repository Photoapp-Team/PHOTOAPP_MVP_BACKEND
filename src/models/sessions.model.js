const mongoose = require("mongoose");
const { Schema } = mongoose;
const Package = require("./packages.model");
const User = require("./users.model");

const sessionSchema = new mongoose.Schema({
  photographerId: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    ],
  },
  userId: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
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
        note: {
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
  price: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: "Packages",
  },
  status: {
    type: [
      {
        type: String,
        enum: [
          "scheduled",
          "approved",
          "payed",
          "cancelled",
          "preUploaded",
          "selected",
          "delivered",
        ],
      },
    ],
  },
  closedAt: {
    type: String,
  },
  ratingValue: {
    type: String,
  },
});

const Session = mongoose.model("sessions", sessionSchema);

module.exports = Session;
