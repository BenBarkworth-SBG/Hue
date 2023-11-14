require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();
const PORT = process.env.MONGO_PORT || 27017;
const routes = require('./Routes/Routes');
const Session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

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

//function to generate a random key
function generateRandomKey(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex') // convert to hexadecimal format
  .slice(0, length); // return required number of characters
}

const secretKey = generateRandomKey(32); // Generate a 32-character key
console.log(secretKey)
// this creates a 1 hour cookie session - connect.sid
app.use(
  Session({
    secret: new Date().toISOString(), // Replace with a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // Session duration in milliseconds (e.g., 1 hour)
  })
)

app.use((req, res, next) => {
  res.locals.userLoggedIn = req.session.user !== "";
  next();
});

// Mount the routes
app.use("/", routes);
app.use('/api', routes);


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
