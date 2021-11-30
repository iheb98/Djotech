const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    },
    brands: {
        type: [String]
    }
});

module.exports = mongoose.model('categories', CategorySchema);