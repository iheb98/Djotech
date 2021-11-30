const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('colors', ColorSchema);