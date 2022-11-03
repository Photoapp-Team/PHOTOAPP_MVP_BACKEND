const { request, response, query } = require("express");
const express = require("express");
const { getUser, getUserRate, editUser } = require("../usecases/user.usecase");
const {
  createNewSession,
  getSessionsWhitPhotographerId,
  getSessionsWhitUserId,
  getUniqueSession,
  editSession,
} = require("../usecases/sessions.usecase");
const { auth, verifyUser, verifyPackageOwner } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const createdSession = await createNewSession(body);
    response.status(201);
    response.json({
      success: true,
      data: { createdSession },
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/photographerId/:id", async (request, response) => {
  try {
    const { params } = request;
    const sessions = await getSessionsWhitPhotographerId(params.id);
    response.json({
      success: true,
      data: {
        sessions,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/userId/:id", async (request, response) => {
  try {
    const { params } = request;
    const user = await getUser(params.id);

    let sessions = {};
    if (user?.role == "User") {
      sessions = await getSessionsWhitUserId(params.id);
    } else {
      sessions = await getSessionsWhitPhotographerId(params.id);
    }
    if (user?.role) {
      response.json({
        success: true,
        data: {
          sessions,
        },
      });
    }
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/session/:id", async (request, response) => {
  try {
    const { params } = request;
    const session = await getUniqueSession(params.id);
    response.json({
      success: true,
      data: { session },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/session/:id", async (request, response) => {
  try {
    const { params, body } = request;
    const session = await editSession(params.id, body);
    response.json({
      success: true,
      data: {
        session,
      },
      message: "Successfully edited session",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/session/rate/:id", auth, async (request, response) => {
  try {
    const { params, body } = request;

    const session = await getUniqueSession(params.id);
    if (!session?.ratingValue?.rating) {
      const editedSession = await editSession(params.id, body);
      const photographerRate = await getUserRate(editedSession.photographerId);
      const newRate = { sessionId: params.id, rate: body.ratingValue.rating };
      photographerRate.ratedSessions.push(newRate);
      const updatedPhotographerRate = await editUser(session.photographerId, photographerRate);
      response.json({
        success: true,
        data: {
          session,
        },
        message: "Successfully rated session",
      });
    } else {
      console.log(uniqueSession.ratingValue.rating);
      response.json({
        success: false,
        message: "Session already rated",
      });
    }
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
