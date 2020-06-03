const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const FriendShip = require('../models/friendship');


module.exports.profile =  async function(req, res){

    let allfriends = await FriendShip.find({});    
    let profile_user = await User.findById(req.params.id);
 
console.log("allfriends",allfriends);

let buttonText = "Add Friend";



if (allfriends.length>0){

for(let i=0; i<allfriends.length; i++ ){

    if ( (allfriends[i].from_user == req.user.id && allfriends[i].to_user == req.params.id) || (allfriends[i].from_user == req.params.id && allfriends[i].to_user == req.user.id)){

        buttonText = "Remove Friend";
    }

}


}


    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:profile_user,
        buttonText:buttonText
    });


    
}



module.exports.destroySession = function(req, res){
 
req.logout();

req.flash("success","You have Logged out!");

return res.redirect('/user/sign-in');


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






module.exports.togglefriend = async function(req,res){
        


    console.log("Friend_ID="+req.query.friend_id+"and"+ req.user.id);    


    try {

    let Frendshipexists = false;
    
    let user1 = await User.findById(req.user.id);
    let user2 = await User.findById(req.query.friend_id);        
        
        
        let Frendshipexist1 = await FriendShip.findOne({
            from_user:req.user.id,
            to_user:req.query.friend_id,
    
        });
    
        let Frendshipexist2 = await FriendShip.findOne({
            from_user:req.query.friend_id,
            to_user:req.user.id,
    
        });

        

if (Frendshipexist1){
    
    user1.friendships.pull(Frendshipexist1._id);
    user1.save();
    Frendshipexist1.remove();
    Frendshipexists = true;
    

    }

else if (Frendshipexist2){
    
        user2.friendships.pull(Frendshipexist2._id);
        user2.save();
        Frendshipexist2.remove();
        Frendshipexists = true;
    

    }

    
    else{
    
        let newFriend = await FriendShip.create({
    
            from_user:req.user.id,
            to_user:req.query.friend_id
                });

        user1.friendships.push(newFriend._id);
        user1.save();
    
    }
    

    console.log("Frendshipexists="+Frendshipexists);
    return res.json(200,{
    
        message:"Request Successfull",
        data:{
    
            Frendshipexists:Frendshipexists
        }
    });
    
    
    } catch (err) {
      
        console.log(err)
    return res.json(500,{
    
        message:'Internal Server Error'
    });
    
    }
    
    


}
    
    













