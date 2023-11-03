const mongoose = require('mongoose');
const palette = require("../models/palette");

const userSchema = new mongoose.Schema({
    user: String,
    email: String,
    pass: String,
    favourites: [{
        hexCode: String,
        paletteType: String,
        name: String
    }],
},
{collection: "Users"}
);

const userInfo = mongoose.model("userInfo", userSchema);

module.exports = userInfo;