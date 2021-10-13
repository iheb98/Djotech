const express = require('express');
const User = require('../models/User.js');
const Produit = require('../models/Produit.js');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/database');
const ROLES = require('../models/roles.js');
//Register
router.post('/register', (req, res) => {
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        login: req.body.login,
        numTel: req.body.numTel,
        motDePasse: req.body.motDePasse,
        rue: req.body.rue,
        ville: req.body.ville,
        codePostal: req.body.codePostal,
        role: req.body.role ? req.body.role : 'Client'
    });

    bcrypt.genSalt(10, (err, salt) => {
        console.log(user);

        if (err) res.json(err);
        bcrypt.hash(user.motDePasse, salt, (err, hash) => {

            if (err) res.json(err);
            user.motDePasse = hash;
            user.save()
                .then(data => {
                    res.json({ status: 200, msg: "Utilisateur ajouté", result: { nom: data.nom } });
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
    const password = req.body.motDePasse;
    console.log(login);

    User.findOne({ login: login }, (err, user) => {
        if (!user) {
            return res.json({ success: false, message: "User not found" });

        }
        console.log(JSON.stringify(req.body) + " / " + user.motDePasse);


        User.comparePassword(password, user.motDePasse, (err, isMatch) => {
            if (err) res.json(err);
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 7200 // 2h
                });


                // **************************************** LOCAL STORAGE **********************************
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        nom: user.nom,
                        prenom: user.prenom,
                        email: user.email,
                        login: user.login,
                        numTel: user.numTel,
                        adresse: user.adresse,
                        image: user.image,
                        idPanier: user.idPanier,
                        codePostal: user.codePostal,
                        rue: user.rue,
                        ville: user.ville,
                        role: user.role
                    }
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
        user.motDePasse = "";
        res.json(user);
    });
});

router.put('/updateImage', async (req, res) => {
    User.findById(req.body.id, async (err, user) => {
        user.image = req.body.image;
        await Produit.find({ idUser: req.body.id }).then(
            async produits => {
                for (let produit of produits) {
                    produit.imageUser = req.body.image;
                    await produit.save().then().catch();
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

        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.ville = req.body.ville;
        user.rue = req.body.rue;
        user.codePostal = req.body.codePostal;
        user.numTel = req.body.numTel;
        user.login = req.body.login;
        user.email = req.body.email;
        user.motDePasse = req.body.motDePasse ? req.body.motDePasse : user.motDePasse;

        user.save().then(data => {
            res.json({ message: "Updated successfully!", status: 200 })
        }).catch(err => {
            res.json({ message: err });
        })
    });
});

router.put('/mdp/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        User.comparePassword(req.body.ancienneMdp, user.motDePasse, (err, isMatch) => {
            if (err) res.json(err);
            if (isMatch) {

                user.motDePasse = req.body.nouvelleMdp;
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) res.json(err);
                    bcrypt.hash(user.motDePasse, salt, (err, hash) => {
                        if (err) res.json(err);
                        user.motDePasse = hash;
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