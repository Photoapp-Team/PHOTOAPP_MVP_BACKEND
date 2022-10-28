const { request, response, query } = require("express");
const express = require("express");
const { getUser } = require("../usecases/user.usecase");

const {
  createNewSession,
  getSessionsWhitPhotographerId,
  getSessionsWhitUserId,
} = require("../usecases/sessions.usecase");

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

module.exports = router;
