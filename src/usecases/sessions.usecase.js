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

const getUnavailableDates = (id) => {
  const sessions = Session.find({
    photographerId: id,
  }).select("status startDate");
  return sessions;
};

const editSession = (id, SessionData) => {
  const editedSession = Session.findByIdAndUpdate(id, SessionData, {
    returnDocument: "after",
  });
  return editedSession;
};

const getUniqueSession = (id) => {
  const session = Session.findById(id);
  return session;
};

const deleteSession = (id) => {
  const sessionDelete = Session.findByIdAndDelete(id);
  return sessionDelete;
};

module.exports = {
  createNewSession,
  getSessionsWhitPhotographerId,
  getSessionsWhitUserId,
  editSession,
  getUniqueSession,
  getUnavailableDates,
  deleteSession,
};
