const express = require('express');
const Color = require('../models/Color');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const colors = await Color.find();
        res.json(colors);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const color = new Color(
        {
            name: req.body.name,
        }
    )
    color.save().then(data => {
        res.json(data);
    }).catch(err => res.json(err))

});

router.put('/', async (req, res) => {
    for (let element of req.body) {
        if (element.touched) {
            Color.findById(element._id).then(color => {

                color.name = element.name || color.name;

                color.save().then(data => {
                    res.json(data);
                }).catch(err => res.json(err));
            }).catch(err=>{
                res.json(err);
            })
        }
    }
});



router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    Color.findByIdAndRemove(req.params.id).then(data => {
        res.json(data)
    }).catch(err => res.json(err));
});

module.exports = router;