const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const QuestionsSchema = new mongoose.Schema({
    title: { type: String, es_indexed: true },
    content: { type: String, es_indexed: true },
    userId: String,
    geo_with_lat_lon: {
        lat: { type: Number },
        lon: { type: Number }
    },
    likes: { type: Object, es_indexed: true }
});

QuestionsSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
})




module.exports = mongoose.model('questions', QuestionsSchema);