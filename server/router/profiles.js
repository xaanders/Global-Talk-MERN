const express = require('express');
const router = express.Router();
const Profile = require("../models/Profile");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.SECRET_KEY;

router.post('/', (req, res) => {
    const id = req.body._id;
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            res.status(498).json({ error: 'The token is not valid' });
            // handle error
        } else {
            Profile.findById(id, (err, profile) => {
                if (!err) {
                    res.status(200).json(profile)
                } else {
                    console.log(err)
                }
            })
        }
    });

});

router.patch('/', (req, res) => {
    const id = req.body.profileId;
    const newDictionary = req.body.newDictionary;
    const newStatistics = req.body.dayStatistics;
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, key, (err, decoded) => {
        if (!err) {
            Profile.findByIdAndUpdate(id, { dictionary: newDictionary, dayStatistics: newStatistics }, { new: true }, (err, newProfile) => {
                if (!err) {
                    res.status(200).json(newProfile)

                } else {
                    console.log(err)
                }
            })
        } else {
            res.status(498).json({ error: 'The token is not valid' });
        }
    });
});

module.exports = router;
