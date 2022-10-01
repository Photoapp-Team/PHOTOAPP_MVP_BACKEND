const { request, response, query } = require("express");
const express = require("express");
const { createUser } = require("../usecases/user.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    console.log(body);
    const createdUser = await createUser(body);
    response.status(201);
    response.json({
      success: true,
      data: {
        createdUser,
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

module.exports = router;
