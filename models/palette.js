const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
    hexCode: {
        type: String,
        required: true,
        maxLength: 7
    },    
    paletteType: {
        type: String,
        required: true,
        enum: ['monochromatic', 'analogous', 'complementary', 'split complementary']
    },    
    name: {
        type: String,
        required: true,
        match: /^(?! )[A-Za-z0-9\s]+$/,
        maxLength: 20
    }    
},
{collection: "Palettes"}
);

const paletteInfo = mongoose.model("paletteInfo", paletteSchema);

module.exports = paletteInfo;