const User = require('../models/user');


module.exports.profile = function(req, res){
 
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


module.exports.destroySession = function(req, res){
 
req.logout();

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


    return res.redirect('/');


/*User.findOne({email:req.body.email},function(err,user){

if(err){console.log('Error in Signing in user'); return; }


if (user){

    if (req.body.password != user.password ){
        return res.redirect('back');

    }

res.cookie('user_id',user.id);
return res.redirect('/user/profile');

    }
else{

    return res.redirect('back');
}

});
*/
    
}

