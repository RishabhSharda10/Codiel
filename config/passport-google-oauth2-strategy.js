const passport = require('passport');
const LocalStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new LocalStrategy({

clientID:'430938549612-8jgilqm01hu0ingj4hqfcq1v7p8gptrl.apps.googleusercontent.com',
clientSecret:'QDE2Qe3OL-Xt0W04dFAQz9Cs',
callbackURL:"http://localhost:8000/user/auth/google/callback"
},
function(accessAToken,refresh,profile,done){

User.findOne({email:profile.emails[0].value}).exec(function(err,user){

if (err){
console.log('error in google strategy-passport',err)
    return done(err);}

if (user){
    
    // req.flash("error","Invalid Username/Password");

console.log(profile);

    return done(null,user);

}
else{

User.create({

name:profile.displayName,
email:profile.emails[0].value,
password:crypto.randomBytes(20).toString('hex')

},function(err,user){

if (err){
        console.log('error in creating User',err)
        return done(err);}
            
        return done(null,user);

})

}
});

}

));




    module.exports = passport;