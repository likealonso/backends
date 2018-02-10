// set up mongoose
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let playerSchema = new Schema({
    name: String,
    sport: String,
    team: String,
    jersey: Number,
    star: Boolean,
    imageUrl: String
})

module.exports = mongoose.model('Player', playerSchema)