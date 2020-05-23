const User = require('../models/user');


module.exports.profile = function(req, res){
 
User.findById(req.params.id,function(err,user){

    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user
    })

});
}


module.exports.destroySession = function(req, res){
 
req.logout();

req.flash("success","You have Logged out!");

return res.redirect('/');


}

module.exports.signup = function(req,res){

    if (req.isAuthenticated()){

        return res.redirect('/');  
      }

    return  res.render('user_sign_up',{
        title:"Codiel | Sign Up"
        
         });
}

module.exports.signin = function(req,res){

    if (req.isAuthenticated()){

        return res.redirect('/');

    }



    return  res.render('user_sign_in',{
        title:"Codiel| Sign In"
        
         });

}



module.exports.create = function(req,res){

if (req.body.password != req.body.confirm_password ){
    return res.redirect('back');
}


    User.findOne({email:req.body.email},function(err,user){

if(err){console.log('Error in Signing Up user'); return; }


if (!user){

    User.create(req.body,function(err,user){

        if(err){console.log('Error in Creating User while sign up'); return; }

        return res.redirect('/user/sign-in');
});

    }
else{

    return res.redirect('back');
}

});

    
}




module.exports.createSession = function(req,res){

req.flash("success","Logged in Successfully");
    return res.redirect('/');


}



module.exports.update = function(req,res){

if (req.params.id == req.user.id){

    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){


        return res.redirect('back');

    
    });
    
    }

    else{
        return res.status(401).send('Unauthorized');

    }
    
    
    
}













