require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();
const PORT = process.env.MONGO_PORT || 27017;
const routes = require('./Routes/Routes');
const Session = require('express-session');
const cookieParser = require('cookie-parser');

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static middleware
app.use(express.static("public/"));

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Import your database module (assuming it's named db.js) here.
require("./db");

// Define the salt rounds for bcrypt from the .env file
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

app.use(
  Session({
    secret: 'your-secret-key', // Replace with a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // Session duration in milliseconds (e.g., 1 hour)
  })
)
mongoose.connect('mongodb://localhost:27017/Hue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
// delete user profile button
app.use(express.json());

// Endpoint to handle user data deletion
app.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find user by ID and delete it from the database
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User data deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Mount the routes
app.use("/", routes);
app.use('/api', routes);


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
