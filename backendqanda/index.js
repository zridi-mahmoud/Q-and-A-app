const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const nodePort = require('./config/nodeServer.config.js');
const cors = require('cors');
const bodyParser = require('body-parser');




// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//allow cors
app.use(cors());

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




require('./routes/question.routes.js')(app);
require('./routes/answer.routes.js')(app);
require('./routes/user.routes.js')(app);


app.listen(nodePort.port, () => {
    console.log("Server is listening on port 5000");
});