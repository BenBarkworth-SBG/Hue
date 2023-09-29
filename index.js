const express = require('express');
const app = express();
const port = 3000;

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


app.get('/home', (req, res) => {    
  res.sendFile("home");
})
app.get('/register', (req, res) => {    
  res.sendFile("register");
})
app.get('/login', (req, res) => {    
  res.sendFile("login");
})

app.listen(port, () => {
  console.log(__dirname);
})