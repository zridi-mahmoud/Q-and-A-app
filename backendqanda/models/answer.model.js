const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    questionId: String,
    content: String,
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('answers', AnswerSchema);