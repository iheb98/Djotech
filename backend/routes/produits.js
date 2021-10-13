const express = require('express');
const Produit = require('../models/Produit');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const produits = await Produit.find();
        res.json(produits);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;