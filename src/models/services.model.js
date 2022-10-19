const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 60,
    required: false,
  },
});

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
