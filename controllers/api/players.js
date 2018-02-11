let Player = require('../../models/player')
// get all
function getAllPlayers (req, res) {
    Player.find((err, allPlayers) => {
        if (err){
            console.log(`index error: ${err}`)
        } else {
            res.json({
                players: allPlayers
            })
        }
    })
};

// get one
function getOnePlayer (req, res) {
    Player.findOne({
        _id: req.params.id
    }, (err, player) => {
        if (err) {
            console.log(`show error: ${err}`)
        } else {
            res.json(player)
        }
    })
};

// create new 
function createPlayer (req, res) {
    let newPlayer = new Player(req.body);
    newPlayer.save((err, player) => {
        if (err) {
            console.log(`save error: ${err}`)
        } else {
            console.log(`saved new player!: ${player.name}`);
            res.json(player)
        }
    })
};

// delete one
function deletePlayer (req, res) {
    let playerId = req.params.id;
    Player.findOneAndRemove({
        _id: playerId
    })
    .populate('player')
    .exec((err, deletedPlayer) => {
        res.json(deletedPlayer)
    })
};

// update one
function updatePlayer (req, res) {
    let playerId = req.params.id;
    Player.findOne({
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

};

module.exports = {
    getAllPlayers,
    getOnePlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
}