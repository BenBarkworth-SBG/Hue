const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');
const db = require('../db');
const bcrypt = require('bcrypt'); 
const { error } = require('console');

//render the register page
router.get('/register', (req, res) => {    
  res.render("register");
});

//render the login page
router.get('/login', (req, res) => {    
  res.render("login");
});

//render the palette page
router.get('/palette', async (req, res) => {    
  // const data = await dataController.getAllPalettesData();
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

//Handle palette creation
router.post('/palette', async (req, res) => {    
  try {
    const {hexCode, type, name} = req.body;
    const data = await dataController.getAllPalettesData();
    console.log(hexCode, type)
    const check = data.filter((d) => d.type == type && d.hexCode == hexCode);
    if (check.length == 0) {
      await dataController.insertPalette({hexCode, type, name});
    }
    // add else conditional for adding to users
    res.send(req.body)
  } 
  catch (error) {
    // console.error(error)
    return res.status(500).json({ error: error.message});
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

// get username and compare with db
router.post('/login', async (req,res) => {
  try {
    const {user, pass} = req.body
    const checkUser = await dataController.getUserByUsername({user: req.body.user});
    console.log(checkUser)
    const hashInDb = checkUser.pass;
    bcrypt.compare(req.body.pass, hashInDb, function (err, result) {
    if (result) {
      userID = checkUser._id;
      res.redirect("/");
    } else {
      res.send("error: invalid username or password");
    }
  });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
  
})

  module.exports = router;