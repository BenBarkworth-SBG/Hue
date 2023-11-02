const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    email: String,
    pass: String,
    favourites: {
        type: [String],
        required: true
    }
},
{collection: "Users"}
);

const userInfo = mongoose.model("userInfo", userSchema);

module.exports = userInfo;