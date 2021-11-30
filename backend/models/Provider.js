const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    description:{
        type:String
    },
    credit:{
        type:Number
    }
});

module.exports = mongoose.model('providers', ProviderSchema);