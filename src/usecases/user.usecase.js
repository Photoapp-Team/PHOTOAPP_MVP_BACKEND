const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 11);
  const user = User.create({ ...userData, password: hashPassword });
  return user;
};

module.exports = {
  createUser,
};
