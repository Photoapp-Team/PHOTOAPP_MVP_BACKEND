const { request, response, query } = require("express");
const express = require("express");
const {
  createUser,
  getUser,
  editUser,
  removeUser,
} = require("../usecases/user.usecase");
const {
  auth,
  verifyOwner,
  verifyUser,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const createdUser = await createUser(body);
    response.status(201);
    response.json({
      success: true,
      data: { createdUser },
    });
  } catch (error) {
    response.status(error.status || 400);

    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", verifyUser, async (request, response) => {
  try {
    const { params } = request;
    const user = await getUser(params.id);
    response.status(201);
    response.json({
      success: true,
      data: {
        userEmail: user.email,
        userLastname: user.lastname,
        userName: user.name,
        userNickname: user.username,
        userProfilepic: user.profilePic,
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

router.patch("/:id", auth, verifyUser, async (request, response) => {
  try {
    const { params, body } = request;
    const user = await editUser(params.id, body);
    response.json({
      success: true,
      data: {
        user,
      },
      message: "User succesfully patched",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", auth, verifyUser, async (request, response) => {
  try {
    const { params } = request;
    const post = await removeUser(params.id);
    response.json({
      success: true,
      message: "User succesfully deleted",
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
