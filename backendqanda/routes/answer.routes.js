module.exports = (app) => {
    const answers = require('../controllers/answer.controller.js');
    const mid = require('../middleWare/mid.js');

    // Create a new Answer
    app.post('/answers', mid.check, answers.create);

    // Retrieve all Answers
    app.get('/answers', mid.check, answers.findAll);

    // Retrieve a single Answer with answerId
    app.get('/answers/:answerId', mid.check, answers.findOne);

    // Delete a Answer with answerId
    app.delete('/answers/:answerId', mid.check, answers.delete);

}