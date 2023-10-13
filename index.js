// explicitly stating that path to the .env file
require('dotenv').config({path: __dirname + '/.env'});
// imports db module from db.js file
require("./db");

const express = require('express');
const path = require("path");
const app = express();

const routes = require("./routes/routes");

// Middleware for parsing JSON bodies
app.use(express.json());

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static middleware
app.use(express.static("public/"))

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});