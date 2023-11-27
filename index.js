require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./Routes/Routes');
const session = require('express-session');
const uuid = require('uuid')

// Middleware for parsing JSON bodies
app.use(express.json());

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static middleware
app.use(express.static("public/"));

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Import your database module (assuming it's named db.js).
require("./db");

// Define the salt rounds for bcrypt from the .env file
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

let sessionKey = uuid.v4()

app.use(session({
    secret: sessionKey, // creates a hash to sign the session id cookie
    resave: false,
    saveUninitialized: false,
    cookie: { 
      sameSite: 'strict',
      maxAge: 3600000} // expires after 1 hour
  })
)

// Mount the routes
app.use("/", routes);
app.use('/api', routes);


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
