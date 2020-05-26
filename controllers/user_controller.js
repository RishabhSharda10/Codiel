const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile =  function(req, res){
 
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



module.exports.update = async function(req,res){

  if (req.params.id == req.user.id){

    try {
        

        let user = await User.findById(req.params.id);

        User.uploadedAvatar(req,res,function(err){

        if(err){ console.log("error","***Multer Error***",err);}
        
        
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file){

            if (user.avatar){

                fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                
            }

            user.avatar = User.avatarPath + "/" + req.file.filename;


        }

        
        user.save();

        return res.redirect('back');


        });



    } catch(err) {
   
    req.flash("error",err);
    return res.redirect('back');


    }
    }

    else{
        return res.status(401).send('Unauthorized');

    }
  
    
    
}













