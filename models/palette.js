const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
    hexCodes: {
        type: [String],
        required: true,
    },    
    paletteType: {
        type: String,
        required: true,
        enum: {
            values: ['monochromatic', 'analogous', 'complementary', 'split'],
            message: 'Invalid palette type. Must be one of: monochromatic, analogous, complementary, split'
        }
    }
},
{collection: "Palettes"}
);
const paletteInfo = mongoose.model("paletteInfo", paletteSchema);

module.exports = paletteInfo;