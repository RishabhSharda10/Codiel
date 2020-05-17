const express = require('express');
const path = require('path');
const port = 8000;


const app = express();

app.listen(port, function(err){

if (err){

console.log(`err in running server ${err}`);

}

console.log(`Running server Succesfully on ${port}`);

})