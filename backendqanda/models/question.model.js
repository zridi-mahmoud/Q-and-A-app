const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
require('dotenv').config();


const QuestionsSchema = new mongoose.Schema({
    title: { type: String, es_indexed: true },
    content: { type: String, es_indexed: true },
    userId: String,
    geo_location: {
        geo_point: {
            es_indexed: true,
            type: String,
            es_type: 'geo_point',
        },
        lat: { type: Number },
        lon: { type: Number }
    },
    likes: { type: Object, es_indexed: true }
});

QuestionsSchema.plugin(mongoosastic, {
    "host": process.env.ELASTIC_HOST,
    "port": process.env.ELASTIC_PORT
})



module.exports = mongoose.model('questions', QuestionsSchema);