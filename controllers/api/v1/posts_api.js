const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){



    let posts = await Post.find({}).sort('-createdAt')
    .populate('user')
     .populate({
        path:'comments',
        populate:{
            path:'user'
        }
      
    });

return res.json(200,{

    message:"List of posts",
    posts:posts
});

}


module.exports.destroy = async function(req,res){

    console.log("req.params.id="+req.params.id);
    console.log("req.user.id="+req.user.id);


try {
    
    let post = await Post.findById(req.params.id);
    console.log("post.user="+post.user);

    
    if(post.user == req.user.id){
    
        post.remove();
    
        await Comment.deleteMany({post:req.params.id});

        return res.json(200,{
        message:"Post deleted successfully"

        });
    }

   else{

        return res.json(401,{
            message:"You cannot delete this user"
    
            });
    
    }
       
}

catch (err) {
    
console.log("*******",err);
    return res.json(500,{
        message:"Internal server error"

        });


}    
}