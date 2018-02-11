/** This is our server file! Where the magic happens. **/

// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');

// connect to db models
// let db = require('./models');
require('./config/database')

// make a new express app named "app".
let app = express();

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/players', require('./routes/players'))

// This is where we serve our API!
app.listen(process.env.PORT || 3000, () => {
    console.log('Your API is running on http://localhost:3000/');
});
