const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');


module.exports.create = async function(req,res){

try {

    let post = await Post.create({
        content:req.body.content,   
        user:req.user._id
        });
        
    req.flash("success","Post Published");


    if (req.xhr){

        post = await post.populate('user', 'name').execPopulate();
        return res.status(200).json({

            data:{

                post:post

            },
            message:"Post created"

        })

    }    


return res.redirect('back');
        
}

catch (err) {

    req.flash("error",err);
    return;
}    
}

module.exports.destroy = async function(req,res){


try {

    
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id){
    
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});


        post.remove();
    
        await Comment.deleteMany({post:req.params.id});

        if (req.xhr){

            return res.status(200).json({
    
                data:{
    
                    post_id:req.params.id
    
                },
                message:"Post deleted successfully"
    
            })
    
        }


    req.flash("success","Post and associated comments deleted");
        
        return res.redirect('back');
    }
    
    else{

req.flash("error","You cannot delete this post");
        
    return res.redirect('back');
    
    }
        

} catch (err) {
 
    req.flash("error",err);
    return;

    
}

}


