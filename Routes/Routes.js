const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');
const user = require('../Models/user')
//const userController = require('../controllers/userController')

router.get('/', async (req, res) => {    
    try {
      const data = await dataController.getAllData();
      res.render("home", {colours: data});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get('/register', (req, res) => {    
    res.render("register");
  });
  
  router.get('/login', (req, res) => {    
    res.render("login");
  });
  
  router.get('/palette', (req, res) => {    
    res.render("palette");
  });
  
  router.post('/login', (req, res) => {    
    console.log(req.body);
  });

  router.post('/users', async (req, res) => {    
    console.log(req.body);
    try {
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });

 // router.post('/users', userController.createUser);

  module.exports = router;