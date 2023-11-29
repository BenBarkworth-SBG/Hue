const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        match: [/^(?! )[A-Za-z0-9\s]{1,30}$/, 'Must only contain letters and numbers and be less than 30 characters']
    },
    email: {
        type: String,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        maxlength: 50
    },
    pass: String,
    favourites: [{
        paletteName: {
            type: String,
            match: [/^(?! )[A-Za-z0-9\s]{1,20}$/, 'Must only contain letters and numbers and be less than 20 characters']
        },
        paletteId: mongoose.Schema.Types.ObjectId,
        _id: false
    }],
},
{collection: "Users"}
);

const userInfo = mongoose.model("userInfo", userSchema);

// userInfo.createIndexes();
module.exports = userInfo;