const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');
const user = require('../Models/user')
const db = require('../db')
//const userController = require('../controllers/userController')

// needed for later
// const bodyParser = require("body-parser");
//const bcrypt = require("bcrypt");

//connecting to MongoDB database
//const MongoClient = require("mongodb").MongoClient;
//const url =;

//const client = new MongoClient(url);

router.get('/', async (req, res) => {    
    try {
      const data = await dataController.getAllData();
      res.render("home", {colours: data});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
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
  


  //render the palette page
  router.post('/login', (req, res) => {    
    console.log(req.body);
  });

  router.post('/palette', async (req, res) => {    
    try {
      console.log("HEREEEE", req.body)
      const {hexCode, type} = req.body;
      console.log(hexCode, type);
      dataController.insertPalette({hexCode, type});
      console.log("HERE")
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });

  //writes to DB after request from frontend
  router.post('/users', async (req, res) => {    
    try {
      const {user, email, pass} = req.body;
      console.log(user, email, pass);
      // do database stuff
      db.insertUser({user, email, pass});
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });

 // router.post('/users', userController.createUser);

  module.exports = router;