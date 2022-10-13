const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 11);
  const user = User.create({ ...userData, password: hashPassword });
  return user;
};

const getUser = (id) => {
  const user = User.findById(id);
  return user;
};

const editUser = (id, userData) => {
  const editedUser = User.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
  });
  return editedUser;
};

const removeUser = (id) => {
  const userDeleted = User.findByIdAndDelete(id);
  return userDeleted;
};

module.exports = {
  createUser,
  getUser,
  editUser,
  removeUser,
};
