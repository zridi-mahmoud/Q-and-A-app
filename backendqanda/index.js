const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();




// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

//allow cors
app.use(cors());

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




require('./routes/question.routes.js')(app);
require('./routes/answer.routes.js')(app);
require('./routes/user.routes.js')(app);


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("Server is listening on port" + process.env.PORT);
});