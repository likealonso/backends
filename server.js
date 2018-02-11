/** This is our server file! Where the magic happens. **/

// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');
    path = require('path');

// connect to db models
// let db = require('./models');
require('./config/database')

// make a new express app named "app".
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/players', require('./routes/api'));
app.use('/players', require('./routes/players'))

// This is where we serve our API!
app.listen(process.env.PORT || 3000, () => {
    console.log('Your API is running on http://localhost:3000/');
});

