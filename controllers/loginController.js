const bcrypt = require('bcrypt');
const dataController = require('../controllers/controllers');

const loginController = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const checkUser = await dataController.getUserByUsername({ user: user });

    if (!checkUser) {
      return res.render('login', { error: 'Wrong credentials: Invalid username or password' });
    }
    const hashInDb = checkUser.pass;
    bcrypt.compare(pass, hashInDb, function (err, result) {
      if (result) {
        req.session.user = user;
        req.session.authorised = true;
        req.session.email = checkUser.email;
        req.session.userid = checkUser._id;
        return res.redirect('/profile');
      } else {
        return res.render('login', { error: 'Wrong credentials: Invalid username or password' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = loginController;