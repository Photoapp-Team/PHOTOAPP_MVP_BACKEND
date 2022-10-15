const express = require("express");
const cors = require("cors");

const server = express();

//Routers
const routerAuth = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routePhoto = require("./routes/photo.route")
const routerPackages = require("./routes/packages.route");

// Middlewares
server.use(cors());
server.use(express.json());

server.use("/auth", routerAuth);
server.use("/users", routerUser);
server.use("/photo", routePhoto);
server.use("/packages", routerPackages);

server.get("/", async (request, response) => {
  response.json("Welcome to the Fotofi API");
});

module.exports = server;
