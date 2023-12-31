const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controllers');
const bcrypt = require('bcrypt'); 
const loginController = require('../controllers/loginController');
const palette = require('../models/palette');

//render the register page
router.get('/register', (req, res) => {    
  res.render("register");
});


//render the login page
router.get('/login', (req, res) => {    
  res.render("login");
});

//render the image page
router.get('/imagepalette', (req, res) => {    
  res.render("imagepalette");
});

//render the palette page
router.get('/palette', async (req, res) => {    
  if (req.session.authorised) {
    res.render('palette');
  } 
  else {
    res.redirect('login');
  }
});

//render the correct homepage
router.get('/', async (req, res) => {   
  if (req.session.authorised) { 
    res.render("homeloggedin");
  }
  else {
    res.render("home");
  }
});


// handle palette creation
router.post('/palette', async (req, res) => {  
  // these have to be declared here to be accessed in the catch block 
  let paletteCheck; 
  let updateUserValidation;
  try {
    let paletteDbInsertion;
    const {hexCodes, paletteType, paletteName} = req.body;
    const username = req.session.user
    const data = await dataController.getAllPalettesData(); 
    const paletteInformation = new palette({hexCodes: hexCodes, paletteType: paletteType});
    // Mongoose validation
    paletteCheck = await paletteInformation.validateSync();
    if (paletteCheck && paletteCheck.errors) {
      throw new Error("Palette validation failed");
    }
    const check = data.filter((d) => d.paletteType == paletteType && d.hexCodes[0] == hexCodes[0]);
    if (check.length == 0) {
       paletteDbInsertion = await dataController.insertPalette({hexCodes, paletteType});
    }
    else {
      paletteDbInsertion = check[0]
    }
    const userDetails = {user: username}
    const pullUser = await dataController.getUserByUsername(userDetails);
    const userID = await dataController.getUserById(pullUser._id.toString());
    // conversion to string needed to ensure comparison can be made as they are complex object types
    const userPaletteCheck = userID.favourites.filter((favourite) => favourite.paletteId.toString() === paletteDbInsertion._id.toString() || favourite.paletteName === paletteName);
    if (userPaletteCheck.length == 0) {
      updateUserValidation = await dataController.updateUser(pullUser._id.toString(), {$push: {favourites: {paletteName: paletteName, paletteId: paletteDbInsertion._id}}});
      // Mongoose validation
      if (updateUserValidation && updateUserValidation.error) {
        throw new Error("Palette name validation failed");
      }
    }
    else {
      throw new Error("Database already contains that palette")
    }
    res.send(req.body)
  } 
  catch (error) {
    if (paletteCheck && paletteCheck.errors && paletteCheck.errors['paletteType']) {
      return res.status(400).json({ error: paletteCheck.errors['paletteType'].message });
    }
    else if (updateUserValidation && updateUserValidation.errors && updateUserValidation.error === 'Must only contain letters and numbers and be less than 20 characters') {
      return res.status(400).json({ error: updateUserValidation.error});
    }
    else {
      return res.status(400).json({error: error.message});
    }
  }
});

//handle login
router.post ('/login', loginController);

//Handle user creation
router.post('/register', async (req, res) => {    
  try {
    const {user, email, pass, favourites} = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);
    // Store the hashed password
    let userID = await dataController.insertUser({user, email, pass: hashedPassword, favourites});
    let username;
    if (typeof user == 'string') {
      username = user;
    } else {
      username = req.session.user;
    }
    res.redirect('/profile')
  } catch (error) {
    if (error.keyValue) {
        let value;
        for (const prop in error.keyValue) {
            // access enum properties in object
            value = error.keyValue[prop]
        }
        return res.status(400).json({ error: `${value} already exists in the database.` });
    }
    else {
        return res.status(400).json({error: error.message});
    }
  }
});

//render profile page
router.get('/profile', async (req, res) => {
  if (req.session.authorised) {
    const userId = req.session.userid; 
    const userEmail = req.session.email; 
    const user = req.session.user;
    const favouritePalettes = await dataController.getUserFavourites({user: user})
    res.render('profile', {username: user, email: userEmail, id: userId, favouritePalettes: favouritePalettes.palettes, paletteNames: favouritePalettes.names});
  } else {
    res.redirect('/login');
  }
})

//handle delete user
router.post("/profile/delete", async (req, res) => {
  try {
    const deletedUser = await dataController.deleteUser(req.body.userId);
    req.session.destroy();
    return res.render('register', { message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//handle delete palette
router.post("/profile/deletePalette", async (req, res) => {
 try {
    const deletedPalette = await dataController.deletePaletteFromFavorites(req.session.userid, req.body.paletteID)
    res.redirect('/profile')
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// update username
router.post('/profile/updateUsername', async (req, res) => {  
		let updateUsernameValidation;
    try {
      const {user} = req.body;
			const pullUser = await dataController.getUserByUsername({user});
			if (pullUser !== null) {
					throw new Error("Username already in database");
			}
			updateUsernameValidation = await dataController.updateUser(req.session.userid, req.body)
			if (updateUsernameValidation && updateUsernameValidation.error) {
        throw new Error("Username change validation failed");
      }
			req.session.user = user;
      res.send(req.body)
  	} 
    catch (error) {
			if (updateUsernameValidation && updateUsernameValidation.errors && updateUsernameValidation.error === 'Must only contain letters and numbers and be less than 30 characters') {
				return res.status(400).json({ error: updateUsernameValidation.error});
			}
			else {
      return res.status(400).json({error: error.message});
			}
    }
  });

//handle logout
router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;