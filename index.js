require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();
const PORT = process.env.MONGO_PORT || 27017;
const routes = require('./Routes/Routes');

// Middleware for parsing JSON bodies
app.use(express.json());

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static middleware
app.use(express.static("public/"));

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Import your database module (assuming it's named db.js) here.
require("./db");

// Define the salt rounds for bcrypt from the .env file
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

// Mount the routes
app.use("/", routes);
app.use('/api', routes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
