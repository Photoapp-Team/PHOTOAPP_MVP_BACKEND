require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./src/routes/user.route");
const app = require("./src/server");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}`;
mongoose
  .connect(URL)
  .then(() => {
    console.log("Conectado a la base de datos de mongo");
    app.listen(8080, () => {
      console.log("Server listening on port 8080...");
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
