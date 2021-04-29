const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const QuestionsSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String,
    location: Object,
    likes: Object
});

QuestionsSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
})

module.exports = mongoose.model('questions', QuestionsSchema);