const express = require('express');
const router = express.Router();
const Word = require("../models/Word");

router.get('/', (req, res) => {
    Word.find({}, (err, words) => {
        if(!err) {
            res.status(200).json(words);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }); 

})

module.exports = router;
