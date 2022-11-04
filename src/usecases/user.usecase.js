const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 11);
  const user = User.create({ ...userData, password: hashPassword });
  return user;
};

const getUser = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const getUserBasicInfo = async (id) => {
  const user = await User.findById(id).select("username profilePic location name lastname");
  if (user._doc.location?.street) {
    user._doc.location.street = "";
  }
  if (user._doc.location?.street) {
    user._doc.location.number = "";
  }

  return user;
};

const getUserRate = async (id) => {
  const user = await User.findById(id).select("ratedSessions");
  return user;
};

const getFilteredUser = async (filters) => {
  const filteredUsers = await User.find(filters).select("-password -payments");

  return filteredUsers;
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
  getFilteredUser,
  getUserBasicInfo,
  getUserRate,
};
