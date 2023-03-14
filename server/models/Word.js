const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: String,
    translation: String,
    meaning: String,
    transcription: String,
    example: String,
    exampleTranslation: String,
    imageUrl: String,
    audioUrl: String,
    level: String
});

module.exports = Word = mongoose.model("words", WordSchema);