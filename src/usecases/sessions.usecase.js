const Session = require("../models/sessions.model");

const createNewSession = async (SessionData) => {
  const session = Session.create({ ...SessionData });
  return session;
};

// const getService = (id) => {
//   const service = Service.findById(id);
//   return service;
// };

// const getAllServices = () => {
//   const services = Service.find();
//   return services;
// };

// const editService = (id, ServiceData) => {
//   const editedService = Service.findByIdAndUpdate(id, ServiceData, {
//     returnDocument: "after",
//   });
//   return editedService;
// };

// const removeService = (id) => {
//   const serviceDeleted = Service.findByIdAndDelete(id);
//   return serviceDeleted;
// };

module.exports = {
  createNewSession,
  // getService,
  // editService,
  // removeService,
  // getAllServices,
};
