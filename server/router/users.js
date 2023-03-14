const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const key = process.env.SECRET_KEY;

const registerInputsValidation = require('../validation/register');
const loginInputsValidation = require('../validation/login');
const User = require("../models/User");
const Profile = require("../models/Profile");

router.post('/register', (req, res) => {
    const { errors, isValid } = registerInputsValidation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const profile = new Profile({
                dictionary: [],
                dayStatistics: {
                    AudioCall: [],
                    Sprint: []
                }
            });

            profile.save((err, savedProfile) => {
                if (err) {
                    console.error(err);
                } else {
                    // Create a new user and link it to the profile
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        profile: savedProfile._id
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save((err, savedUser) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        // Retrieve the user and populate the profile field
                                        User.findById(savedUser._id)
                                            .populate('profile')
                                            .exec((err, populatedUser) => {
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    res.json({ user: user, profile: populatedUser })
                                                }
                                            });
                                    }
                                })
                        });
                    });
                }
            })

            // Hashing password


        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = loginInputsValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email,
        password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: "Email is not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                Profile.findById(user.profile, (err, profile) => {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        profile: profile._id
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        key,
                        {
                            expiresIn: 1000 // 1 year
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                })

            } else {
                return res
                    .status(400)
                    .json({ password: "Password is incorrect" });
            }
        });
    });

})

module.exports = router;
