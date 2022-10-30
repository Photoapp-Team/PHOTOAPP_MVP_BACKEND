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

const editSession = (id, SessionData) => {
  const editedSession = Session.findByIdAndUpdate(id, SessionData, {
    returnDocument: "after",
  });
  return editedSession;
};

// const getService = (id) => {
//   const service = Service.findById(id);
//   return service;
// };

// const getAllServices = () => {
//   const services = Service.find();
//   return services;
// };

// const removeService = (id) => {
//   const serviceDeleted = Service.findByIdAndDelete(id);
//   return serviceDeleted;
// };

module.exports = {
  createNewSession,
  getSessionsWhitPhotographerId,
  getSessionsWhitUserId,
  editSession,
  // getService,
  // removeService,
  // getAllServices,
};
