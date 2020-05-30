//require the library
const mongoose = require('mongoose');
const env = require('./enviroment');
//connect to the database
mongoose.connect('mongodb://100.26.53.37/'+env.db);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;
//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

module.exports =db;