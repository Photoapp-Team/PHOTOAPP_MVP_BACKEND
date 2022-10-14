const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");
const { getUser } = require("../usecases/user.usecase");

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
    const verifiedUser = jwt.verify(token);
    const userId = await getUser(request.params.id);
    if (verifiedUser.id === userId._id.toString()) {
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

module.exports = { auth, verifyUser };
