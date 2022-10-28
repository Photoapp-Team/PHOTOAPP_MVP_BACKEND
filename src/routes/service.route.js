const { request, response, query } = require("express");
const express = require("express");
const {
  addService,
  getService,
  editService,
  removeService,
  getAllServices,
} = require("../usecases/services.usecase");

const router = express.Router();
router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const addedService = await addService(body);
    response.status(201);
    response.json({
      success: true,
      data: { addedService },
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
    const service = await getService(params.id);
    response.json({
      success: true,
      data: {
        service,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.massage,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const { params } = request;
    const services = await getAllServices();
    response.json({
      success: true,
      data: {
        services,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.massage,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const { params, body } = request;
    const service = await editService(params.id, body);
    response.json({
      success: true,
      data: {
        service,
      },
      message: "Successfully edited service",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { params } = request;
    const photo = await removeService(params.id);
    response.json({
      success: true,
      message: "Service deleted successfully",
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
