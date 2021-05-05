const Question = require('../models/question.model.js');


// Retrieve and return all favorit questions of a user.
exports.findFavorit = (req, res) => {
    Question.find({ 'likes': { "$in": [req.params.userId] } })
        .then(question => {
            res.send(question);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving questions."
            });
        });
};


// Create and Save a new question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Question content can not be empty"
        });
    }

    // Create a question
    const question = new Question({
        title: req.body.title || "Untitled Question",
        content: req.body.content,
        userId: req.body.userId,
        geo_location: {
            lat: req.body.location[0],
            lon: req.body.location[1]
        },
        likes: []
    });

    // Save Question in the database
    question.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Question."
            });
        });

};


// Retrieve and return all questions from the database.
exports.findAll = (req, res) => {
    Question.find({ 'userId': req.params.userId })
        .then(question => {
            res.send(question);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving questions."
            });
        });
};

// Like a question identified by the questionId in the request
exports.like = (req, res) => {
    const questionId = req.params.questionId;
    const userId = req.params.userId;

    // Find question and add user to likes
    Question.findByIdAndUpdate(questionId, { $push: { likes: userId } }, { new: true })
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            res.send({ likes: question.likes });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error updating question with id " + req.params.questionId
            });
        });
};

// Like a question identified by the questionId in the request
exports.dislike = (req, res) => {
    const questionId = req.params.questionId;
    const userId = req.params.userId;

    // Find question and remove user from likes
    Question.updateOne({ "_id": questionId }, { $pullAll: { likes: [userId] } })
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            res.send({ question, questionId, userId });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error updating question with id " + req.params.questionId + err
            });
        });
};


// Find a single question with a questionId
exports.findOne = (req, res) => {
    Question.findById(req.params.questionId)
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            res.send(question);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error retrieving question with id " + req.params.questionId
            });
        });
};


// Delete a question with the specified questionId in the request
exports.delete = (req, res) => {
    Question.findByIdAndRemove(req.params.questionId)
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            res.send({ message: "Question deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Could not delete question with id " + req.params.questionId
            });
        });
};

exports.searchTerm = (req, res) => {
    if (req.params.term) {
        Question.search({
            query_string: { query: `*${req.params.term}*` }
        }, {
            from: req.params.start,
            size: req.params.size,
        }, (err, results) => {
            if (err) {
                console.log(err);
            }
            var data = { msg: "no data" }
            if (results.hits.hits) {

                data = results.hits.hits.map((hit) => {
                    return ({
                        _id: hit._id,
                        title: hit._source.title,
                        content: hit._source.title,
                        likes: hit._source.likes
                    })
                });
            }
            res.json({
                data: data,
                total: results.hits.total
            })
        })
    }
}
exports.searchClose = (req, res) => {
    Question.search({
        "match_all": {}
    }, {
        "sort": [{
            "_geo_distance": {
                "geo_location": {
                    "lat": req.params.lat,
                    "lon": req.params.lon
                },
                "order": "asc",
                "unit": "km",
                "mode": "min",
                "distance_type": "arc",
            }
        }],
        from: req.params.start,
        size: req.params.size,
    }, (err, results) => {
        if (err) {
            console.log(err);
        }
        var data = { msg: "no data" }
        if (results.hits.hits) {

            data = results.hits.hits.map((hit) => {
                console.log(hit)
                return ({
                    _id: hit._id,
                    title: hit._source.title,
                    content: hit._source.title,
                    likes: hit._source.likes
                })
            });
        }
        res.json({
            data: data,
            total: results.hits.total
        })
    })

}

//////////////////////////////////////////////
Question.createMapping((err, mapping) => {
    if (err) {
        console.log(err)
    }
    console.log("mapping created");
    console.log(mapping)
})

// var stream = Question.synchronize();
// var count = 0;
// stream.on('data', (res) => {
//     count++;
// })
// stream.on('close', () => {
//     console.log(count + " document indexed")
// })
// stream.on('error', (error) => {
//     console.log(error)
// })


// Question.search({
//     query_string: {
//         query: "admin"
//     }
// }, function(err, results) {
//     console.log(results)
// });