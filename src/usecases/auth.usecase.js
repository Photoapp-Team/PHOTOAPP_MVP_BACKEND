const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");
const { default: mongoose } = require("mongoose");

const login = async (email, textPlainPassword) => {
  const user = await User.findOne({ email });

  if (!user) throw createError(401, "No estás autorizado");

  const isValidPassword = await bcrypt.compare(
    textPlainPassword,
    user.password
  );
  if (!isValidPassword) throw createError(401, "No estás autorizado");

  const token = jwt.sign({ id: user._id });
  return token;
};

module.exports = { login };
