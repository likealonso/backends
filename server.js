/** This is our server file! Where the magic happens. **/

// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');

// connect to db models
let db = require('./models');

// make a new express app named "app".
let app = express();

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

// get all
app.get('/api/players', (req, res) => {
    db.Player.find((err, allPlayers) => {
        if (err){
            console.log(`index error: ${err}`)
        } else {
            res.json({
                players: allPlayers
            })
        }
    })
});

// get one
app.get('/api/players/:id', (req, res) => {
    db.Player.findOne({
        _id: req.params.id
    }), (err, player) => {
        if (err) {
            console.log(`show error: ${err}`)
        } else {
            res.json(player)
        }
    }
});

// create new 
app.post('/api/players', (req, res) => {
});

// delete one
app.delete('/api/players/:id', (req, res) => {
});

// update one
app.put('/api/players/:id', (req, res) => {
});

// This is where we serve our API!
app.listen(process.env.PORT || 3000, () => {
    console.log('Your API is running on http://localhost:3000/');
});
