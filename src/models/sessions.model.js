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
  selectedPics: {
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
    default: false,
    required: true,
  },
  price: {
    type: String,
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
    type: {
      requested: { type: Date, default: Date.now(), required: true },
      scheduled: {
        type: Date,
        required: false,
      },
      approved: {
        type: Date,
        required: false,
      },
      payed: {
        type: Date,
        required: false,
      },
      cancelled: {
        type: Date,
        required: false,
      },
      preUploaded: {
        type: Date,
        required: false,
      },
      selected: {
        type: Date,
        required: false,
      },
      delivered: {
        type: Date,
        required: false,
      },
    },
    default: {},
  },
  closedAt: {
    type: String,
  },
  ratingValue: {
    type: {
      rating: {
        type: Number,
        required: false,
      },
      comments: {
        type: String,
        required: false,
      },
    },
  },
});

const Session = mongoose.model("sessions", sessionSchema);

module.exports = Session;
