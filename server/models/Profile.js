const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    dictionary: [{
        type: String,
        required: true
    }],
    dayStatistics: {
        AudioCall: [{
            date: String,
            answers: [{
                word: { type: String, required: true },
                answer: { type: Boolean, required: true }
            }]
        }],
        Sprint: [{
            date: String,
            answers: [{
                word: { type: String, required: true },
                answer: { type: Boolean, required: true }
            }]
        }]
    }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);