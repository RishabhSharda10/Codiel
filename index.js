const express = require('express');
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


const app = express();

app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views','./views');




app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require('./routes'));

app.listen(port, function(err){

if (err){

console.log(`err in running server ${err}`);

}

console.log(`Running server Succesfully on ${port}`);

})