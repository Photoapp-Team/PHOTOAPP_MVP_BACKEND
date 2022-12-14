const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.*@.*\..*$/,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["f", "m", "o"],
  },
  profilePic: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  favs: {
    type: [
      {
        userId: String,
      },
    ],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["User", "Photographer", "Enterprise"],
  },
  photoTags: {
    type: [
      {
        type: String,
      },
    ],
  },
  displayPics: {
    type: [String],
  },
  phoneNumber: {
    type: Number,
  },
  notifications: {
    type: Number,
  },
  currentPaymentId: {
    type: String,
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
      suburb: {
        type: String,
      },
      street: {
        type: String,
      },
      number: {
        type: String,
      },
      zipCode: {
        type: Number,
        maxlength: 6,
      },
    },
  },
  premium: {
    type: {
      isPremium: {
        type: Boolean,
        default: false,
      },
      expirationDate: {
        type: Date,
      },
      paymentHistory: {
        type: [{ type: Object }],
      },
    },
  },
  socialNetwork: {
    type: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      www: {
        type: String,
      },
    },
  },
  coverPhoto: {
    type: String,
  },
  ratedSessions: {
    type: [
      {
        sessionId: {
          type: String,
        },
        rate: {
          type: Number,
        },
      },
    ],
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
