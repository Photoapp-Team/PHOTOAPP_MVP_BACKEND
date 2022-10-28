const Session = require("../models/sessions.model");

const createNewSession = async (SessionData) => {
  const session = Session.create({ ...SessionData });
  return session;
};
const getSessionsWhitUserId = (id) => {
  const sessions = Session.find({
    userId: id,
  });
  return sessions;
};

const getSessionsWhitPhotographerId = (id) => {
  const sessions = Session.find({
    photographerId: id,
  });
  return sessions;
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
  getSessionsWhitPhotographerId,
  getSessionsWhitUserId,
  // getService,
  // editService,
  // removeService,
  // getAllServices,
};
