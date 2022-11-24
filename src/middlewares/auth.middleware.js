const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");
const { getUser } = require("../usecases/user.usecase");
const { getPackage } = require("../usecases/packages.usecase");
const { getUniqueSession } = require("../usecases/sessions.usecase");

const auth = (request, response, next) => {
  try {
    const authorization = request.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token);

    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
};

//verifyUSER compares that the owner of the info and the requester are thee same
const verifyUser = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const jwtPayload = jwt.verify(token);
    const userFound = await getUser(request.params.id);
    if (userFound && jwtPayload.id === userFound._id.toString()) {
      next();
    } else {
      throw createError(401, "No autorizado");
    }
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
};

const verifyPackageOwner = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const verifiedUser = jwt.verify(token);
    const package = await getPackage(request.params.id);
    const packageOwner = package.photographerId._id.toString();

    if (verifiedUser.id === packageOwner) {
      next();
    } else {
      throw createError(401, "No eres el creador del paquete");
    }
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
};

const verifySessionOwner = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const verifiedUser = jwt.verify(token);
    const session = await getUniqueSession(request.params.id);
    const sessionUserOwner = session.userId[0]._id.toString();
    const sessionPhotographerOwner = session.photographerId[0]._id.toString();

    if (verifiedUser.id === sessionUserOwner || verifiedUser.id === sessionPhotographerOwner) {
      next();
    } else {
      throw createError(401, "No tienes permiso para realizar esta acción");
    }
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { auth, verifyUser, verifyPackageOwner, verifySessionOwner };
