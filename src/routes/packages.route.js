const { request, response, query } = require("express");
const express = require("express");
const {
    createPackage,
    getAllPackages,
    getPhotographerId,
    getPackage,
    removePackage,
} = require("../usecases/packages.usecase");
const { auth, verifyUser, verifyPackageOwner } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, async (request, response) => {
  const { body } = request;
  try {
    const package = await createPackage(body);
    response.status(201);
    response.json({
      success: true,
      data: {package},
    });
  } catch (error) {
    response.status(error.status || 400);

    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
    try {
      const { query } = request;
      const package = await getAllPackages(query);
      response.json({
        success: true,
        data: {
          package,
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

router.get("/photographerId/:id", async (request, response) => {
    try {
      const { params } = request;
      const package = await getPhotographerId(params.id);
      response.json({
        success: true,
        data: {
          package,
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

router.get("/:id", async (request, response) => {
    try {
      const { params } = request;
      const package = await getPackage(params.id);
      response.json({
        success: true,
        data: {
          package,
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

router.delete("/:id", auth, verifyPackageOwner, async (request, response) => {
    try {
      const { params } = request;
      const package = await removePackage(params.id);
      response.json({
        success: true,
        message: "Package succesfully deleted",
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