const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    email: String,
    pass: String,
    favourites: [{
        paletteName: {
            type: String,
            match: /^(?! )[A-Za-z0-9\s]+$/,
            maxLength: 20
        },
        paletteId: mongoose.Schema.Types.ObjectId,
        _id: false
    }],
},
{collection: "Users"}
);

const userInfo = mongoose.model("userInfo", userSchema);

userInfo.createIndexes();
module.exports = userInfo;