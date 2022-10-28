const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");
const { getUser } = require("../usecases/user.usecase");
const { getPackages, getPhotographerId } = require("../usecases/packages.usecase")

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
    const package = await getPhotographerId(request.params.id);
    const {photographerId} = package
    if (verifiedUser.id === photographerId) {
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

module.exports = { auth, verifyUser, verifyPackageOwner };
