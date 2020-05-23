const Comment = require('../models/comments');
const Post = require('../models/posts');



module.exports.create = async function(req,res){
  
try {
    
    let post = await Post.findById(req.body.post);

if(post){

let comment = await Comment.create({

        content:req.body.content,   
        post:req.body.post,            
        user:req.user._id
        
        }); 

        post.comments.push(comment);

        post.save();

req.flash("success","Comment Published");


return res.redirect('/');


}


} catch (err) {

    req.flash("error",err);

    return;

}


}




module.exports.destroy = async function(req,res){
  
try {
    let comment = await Comment.findById(req.params.id);
    
   
if (comment.user == req.user.id)
{

let postId = comment.post
    comment.remove();

await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

req.flash("success","Comment Removed successfully");


return res.redirect('back');

}

else{


req.flash("error","You cannot remove this comment");

 return res.redirect('back');


}



} catch (err) {

    req.flash("error",err);
    

}

}
    
