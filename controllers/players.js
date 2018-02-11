var Player = require('../models/player');

function index (req,res) {
    Player.find({}, function(err, players){
        if (err) {
            console.log(`err occurred ${err}`)
        } else {
        res.render('players/index', { players })
        }
    });
}

function newPlayer (req, res) {
    res.render('players/new');
}

function create(req, res){
var player= new Player(req.body);
player.save(function(err){

    if (err) return res.render('players/new');
    console.log(player);

    res.redirect('/players');
});
}

function bye (req, res){
    Player.findByIdAndRemove(req.params.id, function(err){
    res.redirect('/players')
    });
    
}

function edit(req,res){
    Player.findById(req.params.id, function(err, player) {
        console.log('movie =', movie)
        res.render('player/edit', { player });
    });
    
}

function update(req, res){
    console.log('HELLLOOOOO!!!!!!')
    // Movie.findById(req.params.id, function (err, movie) {
    //     if (err) console.log('handle err', err)
    //     if (req.body.title) movie.title = req.body.title
    //     if (req.body.rating) movie.rating = req.body.rating

    //     movie.save(function (err, movie) {
    //         if (err) console.log('handle me ', err)
    //         res.redirect('/movies')
    //     })

    // });

    Player.findByIdAndUpdate(req.params.id, req.body, function(err, player){
        res.redirect('/players')
    })

}

function show(req, res) {
    Player.findById(req.params.id, function(err, player){
        res.render('players/show', { player })
    });
}

module.exports = {
    index,
    new: newPlayer,
    create,
    destroy: bye,
    edit,
    update,
    show
};