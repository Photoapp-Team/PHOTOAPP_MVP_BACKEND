const express = require("express");
const cors = require("cors");

const server = express();
connectDB();

//Routers
const routerAuth = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routePhoto = require("./routes/photo.route");
const routeService = require("./routes/service.route");
const routerPackages = require("./routes/packages.route");
const routerSessions = require("./routes/session.route");
const routerImagesUpload = require("./routes/upload.route");
const routerPayments = require("./routes/payments.route");
const { connectDB } = require("./lib/db.config");


// Middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded())
server.use("/auth", routerAuth);
server.use("/users", routerUser);
server.use("/photo", routePhoto);
server.use("/services", routeService);
server.use("/packages", routerPackages);
server.use("/sessions", routerSessions);
server.use("/upload", routerImagesUpload);
server.use("/payments", routerPayments);

server.get("/", async (request, response) => {
  response.json("Welcome to the Fotofi API");
});

module.exports = server;
