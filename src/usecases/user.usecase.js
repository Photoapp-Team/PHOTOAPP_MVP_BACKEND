const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 11);
  const user = User.create({ ...userData, password: hashPassword });
  return user;
};

const getUser = async (id) => {
  const user = await User.findById(id);
  user.password = "";
  return user;
};

const getFilteredUser = async (filters) => {
  const users = await User.find(filters);
  users.forEach((user) => {
    user.password = "";
    user.email = "";
    user.phoneNumber = "";
  });

  //! Para usar una forma mas elegante de proteger la informacion, en progreso
  // const users = await User.find(
  //   { filters },
  //   "-password -phoneNumber -email",
  //   function (err, docs) {
  //     console.log("DOCUMENTOS", docs);
  //     return docs;
  //   }  );
  return users;
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
};
