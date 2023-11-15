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
  // if (req.session.user) {
    res.render('palette');
  // } else {
  //   res.redirect('login');
  // }
});

//render the palette page
router.get('/random', async (req, res) => {    
  // if (req.session.user) {
    res.render('random');
  // } else {
  //   res.redirect('login');
  // }
});

//render the profile page
// router.get('/profile', (req, res) => {    
//   res.render("profile");
//});

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
    // console.log(req.session.user)
    // has to be declared here to be accessed later in the try block
    let paletteDbInsertion;
    const {hexCodes, paletteType, name, username} = req.body;
    const data = await dataController.getAllPalettesData(); 
    const check = data.filter((d) => d.paletteType == paletteType && d.hexCodes == hexCodes);
    if (check.length == 0) {
       paletteDbInsertion = await dataController.insertPalette({hexCodes, paletteType});
    }
    else {
      paletteDbInsertion = check[0]
    }
    const usernameArray = username.split('=')
    const userValue = usernameArray[1]
    const dataTest = {user: userValue}
    const pullUser = await dataController.getUserByUsername(dataTest);
    const userID = await dataController.getUserById(pullUser._id.toString());
    // conversion to string needed to ensure comparison can be made as they are complex object types
    const userPaletteCheck = userID.favourites.filter((favourite) => favourite.paletteId.toString() === paletteDbInsertion._id.toString() || favourite.paletteName === name);
    if (userPaletteCheck.length == 0) {
      await dataController.updateUser(pullUser._id.toString(), {$push: {favourites: {paletteName: name, paletteId: paletteDbInsertion._id}}});
    }
    else {
      throw error.message("Database already contains that palette")
    }
    res.send(req.body)
  } 
  catch (error) {
    return res.status(400).json({error: error.message});
  }
});

// get username and compare with db
router.post('/login', async (req,res) => {
  try {
    const {user, pass, email} = req.body
    const checkUser = await dataController.getUserByUsername({user: req.body.user});
    // console.log(checkUser)
    const hashInDb = checkUser.pass;
    bcrypt.compare(req.body.pass, hashInDb, function (err, result) {
    if (result) {
      userID = checkUser._id;
      userEmail = checkUser.email;
      req.session.user = { id: 1, user: user, userEmail, userID};
      res.redirect('/profile');
    } else {
      res.send("error: invalid username or password");
    }
  });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})
  //writes to DB after request from frontend
router.post('/users', async (req, res) => {    
  try {
    const {user, email, pass, favourites} = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10); // Hash the password
    dataController.insertUser({user, email, pass: hashedPassword, favourites}); // Store the hashed password
    res.render('profile', { user : req.session.user, userEmail, userId});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/profile', (req, res) => {
  if (req.session.user) {
    const userId = req.session.user.id; // Assuming user ID is stored in the 'id' property
    const userEmail = req.session.user.email; // Assuming user email is stored in the 'email' property
    const user = req.session.user.user;
    res.render('profile', { user : req.session.user, userEmail, userId});
  } else {
    res.redirect('login');
  }
});

router.post("/profile/delete", async (req, res) => {
  try {
    const deletedUser = await dataController.deleteUser(req.session.user.userID);
     return res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    return res.redirect('login');
  });
});

module.exports = router;