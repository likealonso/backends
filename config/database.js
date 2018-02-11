let mongoose = require('mongoose');
mongoose.Promise = Promise;
// This is where we serve our DB!
mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/my-api'
);

var db = mongoose.connection;
 
 db.once('open', function() {
 	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
 });
 
 db.on('error', function(err) {
 	console.error(`Database error:\n${err}`);
 });