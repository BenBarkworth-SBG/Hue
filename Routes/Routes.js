const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');
const db = require('../db');
const bcrypt = require('bcrypt'); 

//render the register page
router.get('/register', (req, res) => {    
  res.render("register");
});

//render the login page
router.get('/login', (req, res) => {    
  res.render("login");
});

//render the palette page
router.get('/palette', (req, res) => {    
  res.render("palette");
});

//render the profile page
router.get('/profile', (req, res) => {    
  res.render("profile");
});

router.get('/', async (req, res) => {    
    try {
      const data = await dataController.getAllColoursData();
      res.render("home", {colours: data});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//render the palette page
router.post('/login', (req, res) => {    
  console.log(req.body);
});

//Handle palette creation
router.post('/palette', async (req, res) => {    
  try {
    const {hexCode, type, name} = req.body;
    dataController.insertPalette({hexCode, type, name});
    res.status(201).json(req.body); // sends JSON data response back to client
    } 
    catch (error) {
      res.status(500).json({ error: error.message});
    }
  });

  //writes to DB after request from frontend
router.post('/users', async (req, res) => {    
  try {
    const {user, email, pass} = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10); // Hash the password
    dataController.insertUser({user, email, pass: hashedPassword}); // Store the hashed password
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  module.exports = router;