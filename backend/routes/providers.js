const express = require('express');
const Provider = require('../models/Provider');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    Provider.findById(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{res.json(err)})
});


router.post('/', async (req, res) => {
    const provider=new Provider(
        {
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            description:req.body.description,
            credit:req.body.credit,
        }
    )
    provider.save().then(data=>{
        res.json(data);
    }).catch(err=>res.json(err))
});

router.put('/', async (req, res) => {
    Provider.findById(req.body.id).then(provider=>{
        provider.name=req.body.name || provider.name;
        provider.phone=req.body.phone || provider.phone;
        provider.email=req.body.email || provider.email;
        provider.description=req.body.description || provider.description;
        provider.credit=req.body.credit || provider.credit;

        provider.save().then(data=>{
            res.json(data);
        }).catch(err=>res.json(err));
    })
});



router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    Provider.findByIdAndRemove(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

module.exports = router;