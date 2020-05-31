const Comment = require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const CommentEmailWorker = require('../workers/comment_email_worker')
const Like = require('../models/likes');


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


comment = await comment.populate('user','name email').execPopulate();

// commentsMailer.newComment(comment);

let job = queue.create('emails',comment).save(function(err) {

    if(err){console.log("err in creating Queue"); return;}

    console.log("job in queue",job.id);
    
});

if (req.xhr){
                
    
return res.status(200).json({
        data: {
            comment: comment
        },
        message: "Post created!"
    });
}




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

await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


if (req.xhr){
    return res.status(200).json({
        data: {
            comment_id: req.params.id
        },
        message: "Post deleted"
    });
}


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
    
