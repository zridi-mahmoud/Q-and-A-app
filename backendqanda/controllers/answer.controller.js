const Answer = require('../models/answer.model.js');

// Create and Save a new Answer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Answer content can not be empty"
        });
    }

    // Create a Answer
    const answer = new Answer({
        questionId: req.body.questionId,
        content: req.body.content,
        userId: req.body.userId
    });
    // Save Answer in the database
    answer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Answer."
            });
        });
};

// Retrieve and return all answers from the database.
exports.findAll = (req, res) => {
    Answer.find({ 'questionId': req.params.questionId })
        .then(answers => {
            res.send(answers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving answers."
            });
        });
};

// Find a single answer with a answerId
exports.findOne = (req, res) => {
    Answer.findById(req.params.answerId)
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.answerId
                });
            }
            res.send(answer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.answerId
                });
            }
            return res.status(500).send({
                message: "Error retrieving answer with id " + req.params.answerId
            });
        });
};


// Delete a answer with the specified answerId in the request
exports.delete = (req, res) => {
    Answer.findByIdAndRemove(req.params.answerId)
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.answerId
                });
            }
            res.send({ message: "Answer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.answerId
                });
            }
            return res.status(500).send({
                message: "Could not delete answer with id " + req.params.answerId
            });
        });
};