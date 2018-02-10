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
    }, (err, player) => {
        if (err) {
            console.log(`show error: ${err}`)
        } else {
            res.json(player)
        }
    })
});

// create new 
app.post('/api/players', (req, res) => {
    let newPlayer = new db.Player(req.body);
    newPlayer.save((err, player) => {
        if (err) {
            console.log(`save error: ${err}`)
        } else {
            console.log(`saved new player!: ${player.name}`);
            res.json(player)
        }
    })
});

// delete one
app.delete('/api/players/:id', (req, res) => {
    let playerId = req.params.id;
    db.Player.findOneAndRemove({
        _id: playerId
    })
    .populate('player')
    .exec((err, deletedPlayer) => {
        res.json(deletedPlayer)
    })
});

// update one
app.put('/api/players/:id', (req, res) => {
    let playerId = req.params.id;
    db.Player.findOne({
        _id: playerId
    }, (err, foundPlayer) => {
        if (err) {
            console.log(`could not find the player`)
        } else {
            foundPlayer.name = req.body.name || foundPlayer.name;
            foundPlayer.sport = req.body.sport || foundPlayer.sport;
            foundPlayer.team = req.body.team || foundPlayer.team;
            foundPlayer.jersey = req.body.jersey || foundPlayer.jersey;
            foundPlayer.star = req.body.star || foundPlayer.star;
            foundPlayer.imageUrl = req.body.imageUrl || foundPlayer.imageUrl;
            console.log(`updating ${foundPlayer.name}`);
            // save it
            foundPlayer.save((err, player) => {
                if (err) {
                    console.log(`update error ${err}`)
                } else {
                    console.log(`updated player ${player.name}`);
                    res.json(player)
                }
            })

        }
    })

});

// This is where we serve our API!
app.listen(process.env.PORT || 3000, () => {
    console.log('Your API is running on http://localhost:3000/');
});
