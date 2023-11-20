const bcrypt = require('bcrypt');
const dataController = require('../controllers/controllers');


const loginController = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const checkUser = await dataController.getUserByUsername({ user: user });

    if (!checkUser) {
      // User not found
      res.send("error: invalid username or password");
      return res.redirect('/login');
    }

    const hashInDb = checkUser.pass;

    bcrypt.compare(pass, hashInDb, function (err, result) {
      if (result) {
        let userID = checkUser._id;
        let userEmail = checkUser.email;
        
        req.session.user = user;
        req.session.authorised = true;
        req.session.email = userEmail;
        req.session.userid = userID;

        return res.redirect('/profile');
      } else {
        res.send("error: invalid username or password");
        return res.redirect('/login');
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginController;
