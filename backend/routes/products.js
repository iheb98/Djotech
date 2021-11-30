const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const product=new Product(
        {
            name:req.body.name,
            brand:req.body.brand,
            color:req.body.color,
            provider:req.body.provider,
            state:req.body.state,
            price:req.body.price,
            sellingPrice:req.body.sellingPrice,
            quantity:req.body.quantity,
            category:req.body.category.name,
            description:req.body.description,
            image:req.body.image
        }
    )
    product.save().then(data=>{
        res.json(data);
    }).catch(err=>res.json(err))
    
});

router.put('/', async (req, res) => {
    Product.findById(req.body._id).then(product=>{
        console.log(product);
        product.name=req.body.name || product.name;
        product.brand=req.body.brand || product.brand;
        product.color=req.body.color || product.color;
        product.provider=req.body.provider || product.provider;
        product.state=req.body.state || product.state;
        product.price=req.body.price || product.price;
        product.sellingPrice=req.body.sellingPrice || product.sellingPrice;
        product.quantity=req.body.quantity || product.quantity;
        product.category=req.body.category || product.category;
        product.description=req.body.description || product.description;
        product.image=req.body.image || product.image;

        product.save().then(data=>{
            res.json(data);
        }).catch(err=>res.json(err));
    })
});



router.delete('/:id', async (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

router.get('/:id', async (req, res) => {
    Product.findById(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

module.exports = router;