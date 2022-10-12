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
  },
  address: {
    type: {
      city: {
        type: String,
      },
      suburb: {
        type: String,
      },
      street: {
        type: String,
      },
      number: {
        type: Number,
      },
      zipCode: {
        type: Number,
        maxlength: 6,
      },
    },
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
        userId: {
          type: String,
        },
      },
    ],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["user", "photographer", "enterprise"],
  },
  photoTags: {
    type: [
      {
        type: String,
      },
    ],
  },
  displayPics: {
    type: [
      {
        type: String,
      },
    ],
  },
  phoneNumber: {
    type: Number,
  },
  notifications: {
    type: Number,
  },
  payments: {
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
  premium: {
    type: {
      isPremium: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ["isActive", "isExpired"],
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
});

const User = mongoose.model("users", userSchema);

module.exports = User;
