const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
    hexCodes: {
        type: [String],
        required: true,
        maxLength: 7,
        match: /^[a-f0-9#]+$/,
    },    
    paletteType: {
        type: String,
        required: true,
        enum: ['monochromatic', 'analogous', 'complementary', 'split']
    }
},
{collection: "Palettes"}
);

const paletteInfo = mongoose.model("paletteInfo", paletteSchema);

module.exports = paletteInfo;