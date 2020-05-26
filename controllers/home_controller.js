const User = require('../models/user');
const Post = require('../models/posts');

module.exports.home = async function(req,res){

    try {

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
            allUsers:user
             });
                

    }
    
    catch (err) {
   
        console.log("Errorrs",err);        
        return;
    }

}

