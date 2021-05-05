module.exports = (app) => {
    const questions = require('../controllers/question.controller.js');
    const mid = require('../middleWare/mid.js');

    // Retrieve and return all favorit questions of a user.
    app.get('/questions/favorite/:userId', mid.check, questions.findFavorit);

    // Create a new question
    app.post('/questions', mid.check, questions.create);

    // Retrieve all questions
    app.get('/questions/user/:userId', mid.check, questions.findAll);

    //Like a question
    app.put('/questions/like/:questionId/:userId', mid.check, questions.like);

    // Dislike a question with questionId
    app.delete('/questions/dislike/:questionId/:userId', mid.check, questions.dislike);

    // Retrieve a single question with questionId
    app.get('/questions/one/:questionId', mid.check, questions.findOne);

    // Delete a question with questionId
    app.delete('/questions/:questionId', mid.check, questions.delete);

    //  Search by term
    app.get('/questions/search/term/:term', questions.searchTerm)

    //  Search by location
    app.get('/questions/search/loc/:lat/:lon/:start/:size', questions.searchClose)
}