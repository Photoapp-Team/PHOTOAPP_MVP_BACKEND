const Service = require("../models/services.model");

const addService = async (ServiceData) => {
  const service = Service.create({ ...ServiceData });
  return service;
};

const getService = (id) => {
  const service = Service.findById(id);
  return service;
};

const getAllServices = () => {
  const services = Service.find();
  return services;
};

const editService = (id, ServiceData) => {
  const editedService = Service.findByIdAndUpdate(id, ServiceData, {
    returnDocument: "after",
  });
  return editedService;
};

const removeService = (id) => {
  const serviceDeleted = Service.findByIdAndDelete(id);
  return serviceDeleted;
};

module.exports = {
  addService,
  getService,
  editService,
  removeService,
  getAllServices,
};
