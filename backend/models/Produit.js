const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nom: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: [String]
    },
    prix: {
        type: Number
    },
    quantite: {
        type: Number
    },
    couleur: {
        type: String
    },
    taillePulle: {
        type: String
    },
    tailleChaussure: {
        type: String
    },
    pouces: {
        type: String
    },
    etat: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageUser: {
        type: String
    },
    nomUser: {
        type: String
    },
    idUser: {
        type: String
    },
    loginUser: {
        type: String
    },
    rating: {
        type: Number
    },
    nbRating: {
        type: Number
    },
    promotion:{
        type:Number,
        default:0
    },
    categorie:{
        type: String
    }
});

module.exports = mongoose.model('produits', ProduitSchema);