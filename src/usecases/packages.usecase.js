const Package = require("../models/packages.model");
const bcrypt = require("bcrypt");

const createPackage = async (packageData) => {
  const package = await Package.create( packageData )
  return package;
};

const getAllPackages = (filters) => {
    const packages = Package.find(filters);
    return packages;
};

const getPhotographerId = (id) => {
    const package = Package.find({photographerId:id});
    return package;
};

const getPackage = (id) => {
  const package = Package.findById(id);
  return package;
};

const removePackage = (id) => {
  const packageRemove = Package.findByIdAndDelete(id);
  return packageRemove;
};

module.exports = {
  createPackage,
  getAllPackages,
  getPhotographerId,
  getPackage,
  removePackage,
};
