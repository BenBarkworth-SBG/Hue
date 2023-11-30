const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        match: [/^(?! )[\w\s']{1,30}$/, 'Username must only contain letters and numbers and be less than 30 characters']
    },
    email: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must follow the usual format'],
        maxlength: [50, 'Email must be less than 50 characters']
    },
    pass: String,
    favourites: [{
        paletteName: {
            type: String,
            match: [/^(?! )[\w\s']{1,20}$/, 'Password must only contain letters and numbers and be less than 20 characters']
        },
        paletteId: mongoose.Schema.Types.ObjectId,
        _id: false
    }],
},
{collection: "Users"}
);

const userInfo = mongoose.model("userInfo", userSchema);

module.exports = userInfo;