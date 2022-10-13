const express = require("express");
const cors = require("cors");

const server = express();

//Routers
const routerUser = require("./routes/user.route");

// Middlewares
server.use(cors());
server.use(express.json());

server.use("/users", routerUser);

server.get("/", async (request, response) => {
  response.json("Welcome to the Fotofi API");
});

module.exports = server;
