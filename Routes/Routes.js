const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');

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

  module.exports = router;