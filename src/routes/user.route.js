const { request, response, query } = require("express");
const express = require("express");
const {
  createUser,
  getUser,
  editUser,
  removeUser,
  getFilteredUser,
  getUserBasicInfo,
} = require("../usecases/user.usecase");
const { auth, verifyUser } = require("../middlewares/auth.middleware");
const router = express.Router();
const Usercontroller = require('../usecases/emailverify.usecase');


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

router.get("/:id", async (request, response) => {
  try {
    const { params } = request;
    const user = await getUser(params.id);
    response.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const { query } = request;
    let filters = { ...query };
    if (query.photoTags instanceof Array) {
      filters = { ...filters, photoTags: { $all: query.photoTags } };
    }
    const users = await getFilteredUser(filters);
    response.json({
      success: true,
      data: {
        users,
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

router.get("/basicinfo/:id", async (request, response) => {
  try {
    const { params } = request;

    user = await getUserBasicInfo(params.id);
    response.json({
      success: true,
      data: {
        user,
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
