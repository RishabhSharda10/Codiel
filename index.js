const express = require('express');
const env = require('./config/enviroment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

require('./config/view-helpers')(app);

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//user for session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo')(session);

const sassMiddleware =  require('node-sass-middleware');
const flash =  require('connect-flash');
const customMware = require('./config/middleware');

// Set up the Chat server to use Socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on Port 5000");

if(env.name=="development"){
app.use(sassMiddleware({

src:path.join(__dirname,env.asset_path,'scss'),
dest:path.join(__dirname,env.asset_path,'css'),
debug:true,
outputStyle:'extended',
prefix:'/css'

}));
}



app.use(express.urlencoded());
app.use(cookieParser());

console.log("env"+env.asset_path);
app.use(express.static(env.asset_path));
app.use('/uploads',express.static( __dirname +'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');


app.use(session({

name:'codiel',
secret:'blahsomething',
saveUninitialized:false,
resave:false,
cookie:{

    maxAge:(1000*60*100)
},
store: new MongoStore(
    {

mongooseConnection:db,
    autoRemove:'disabled'
},

function(err){


    console.log(err || 'connect-mongodb setup ok');
}

)

}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes'));

app.listen(port, function(err){

if (err){

console.log(`err in running server ${err}`);

}

console.log(`Running server Succesfully on ${port}`);

});