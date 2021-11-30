const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const category=new Category(
        {
            name:req.body.name,
            brands:req.body.brands
        }
    )
    category.save().then(data=>{
        res.json(data);
    }).catch(err=>res.json(err))
    
});

router.put('/', async (req, res) => {
    Category.findById(req.body._id).then(category=>{

        category.name=req.body.name || category.name;
        category.brand=req.body.brands || category.brands;

        category.save().then(data=>{
            res.json(data);
        }).catch(err=>res.json(err));
    })
});



router.delete('/:id', async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

router.get('/:id',  (req, res) => {
    Category.findById(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

module.exports = router;