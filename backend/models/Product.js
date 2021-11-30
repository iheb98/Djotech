const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    image: {
        type: [String]
    },
    price: {
        type: Number
    },
    sellingPrice:{
        type:Number
    },
    quantity: {
        type: Number
    },
    color: {
        type: String
    },
    state: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String
    },
    provider:{
        type:String
    }
});

module.exports = mongoose.model('products', ProductSchema);