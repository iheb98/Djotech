const express = require('express');
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ROLES = require('../models/roles.js');
//Register
router.post('/register', (req, res) => {
    const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        login: req.body.login,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        role: req.body.role ? req.body.role : 'Owner'
    });

    bcrypt.genSalt(10, (err, salt) => {
        console.log(user);

        if (err) res.json(err);
        bcrypt.hash(user.password, salt, (err, hash) => {

            if (err) res.json(err);
            user.password = hash;
            user.save()
                .then(data => {
                    res.json({ status: 200, msg: "Utilisateur ajouté", result: { lastName: data.lastName } });
                })
                .catch(err => {
                    res.json(err);
                });
        })
    })
})

router.post('/verifieremail', (req, res) => {
    User.findOne({ email: req.body.email }).then(data => {
        if (data != null) {
            res.json(true)
        } else {
            res.json(false)
        }
    })
})

router.post('/verifierlogin', (req, res) => {
    User.findOne({ login: req.body.login }).then(data => {
        if (data != null) {
            res.json(true)
        } else {
            res.json(false)
        }
    })
})



router.post('/authenticate', (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    console.log(login);

    User.findOne({ login: login }, (err, user) => {
        if (!user) {
            return res.json({ success: false, message: "User not found" });

        }
        console.log(JSON.stringify(req.body) + " / " + user.password);


        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) res.json(err);
            if (isMatch) {
                user.password=undefined;
                const token = jwt.sign(user.toJSON(), process.env.SECRET, {
                    expiresIn: 7200 // 2h
                });


                // **************************************** LOCAL STORAGE **********************************
                res.json({
                    success: true,
                    token: 'JWT ' + token
                })
                //********************************************************
            } else {
                return res.json({ success: false, msg: 'mot de passe!' });
            }
        })
    })



});
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ status: 200, message: "Liste des clients", result: users });
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.password = "";
        res.json(user);
    });
});

router.put('/updateImage', async (req, res) => {
    User.findById(req.body.id, async (err, user) => {
        user.image = req.body.image;
        await Product.find({ idUser: req.body.id }).then(
            async products => {
                for (let product of products) {
                    product.imageUser = req.body.image;
                    await product.save().then().catch();
                }
            }
        )

        user.save().then(
            async (data) => {
                console.log(JSON.stringify(req.body.id));

                res.json(data);

            }
        ).catch(
            err => {
                res.json(err);
            }
        );
    });
});



router.put('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {

        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.login = req.body.login;
        user.email = req.body.email;
        user.password = req.body.password ? req.body.password : user.password;

        user.save().then(data => {
            res.json({ message: "Updated successfully!", status: 200 })
        }).catch(err => {
            res.json({ message: err });
        })
    });
});

router.put('/mdp/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        User.comparePassword(req.body.ancienneMdp, user.password, (err, isMatch) => {
            if (err) res.json(err);
            if (isMatch) {

                user.password = req.body.nouvelleMdp;
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) res.json(err);
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) res.json(err);
                        user.password = hash;
                        user.save().then(data => {
                            res.json({ message: "Mot de passe modifié !" })
                        }).catch(err => {
                            res.json({ message: err });
                        })
                        res.json({
                        })
                    })
                })


            } else {
                return res.json({ success: false, msg: 'mot de passe!' });
            }
        })


    });
});


router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(data => {
            res.json({ message: "user deleted" });
        })
        .catch(err => {
            res.json({ message: "error" });
        });
});

module.exports = router;