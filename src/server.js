const express = require("express");
const cors = require("cors");

const server = express();

//Routers
const routerUser = require("./routes/user.route");

// Middlewares
server.use(cors());
server.use(express.json());

server.use("/users", routerUser);

module.exports = server;
