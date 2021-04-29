module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // // Create a new user
    // app.post('/users', users.create);

    // // Retrieve all users
    // app.get('/users', users.findAll);

    // // Retrieve a single user with userId
    // app.get('/users/:userId', users.findOne);

    // // Delete a user with userId
    // app.delete('/users/:userId', users.delete);

    //Register a user
    app.post('/register', users.register, users.sign_in);

    //sign in a user
    app.post('/login', users.sign_in);

}