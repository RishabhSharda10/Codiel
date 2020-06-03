const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/posts');
const FriendShip = require('../models/friendship');

module.exports.home = async function(req,res){

    try {


     //   if (req.user){        
        let FriendsArray = [];
        let allfriends = await FriendShip.find({});    

        if (allfriends.length>0){




            for(let i=0; i<allfriends.length; i++ ){
            
                if ( (allfriends[i].from_user == req.user.id)){
            
                    FriendsArray.push(mongoose.Types.ObjectId(allfriends[i].to_user));
                }
                
                else if ((allfriends[i].to_user == req.user.id)){
            
                    FriendsArray.push(mongoose.Types.ObjectId(allfriends[i].from_user));
                }

            }
            
            
            
            }

           console.log("FriendsArray="+FriendsArray);

           let Friends = await User.find(  { _id: { $in: FriendsArray } });


           console.log("Friends="+Friends);


        let posts = await Post.find({}).sort('-createdAt')
        .populate('user')
         .populate({
            path:'comments',
            populate:{
                path:'user'
            }
          
        });
        
        
        let user = await User.find({});
        
            
        return  res.render('home',{
            title:"My home",
            posts:posts,
            allUsers:user,
            Friends:Friends
             });
                
// }
// else{

//     return res.redirect('/user/sign-in');


// }
    }
    
    catch (err) {
   
        console.log("Errorrs",err);        
        return;
    }

}

