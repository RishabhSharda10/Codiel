{
    let createPost = function() {
        let newPostForm = $("#new-post-form");
   
        newPostForm.submit(function(e){
           e.preventDefault();
        
           $.ajax({

            type:'post',
            url:'/post/create',
            data:newPostForm.serialize(),
            success:function(data) {
             let newPost = newPostDom(data.data.post);
                $("#posts-list-container>ul").prepend(newPost);
                deletePost($(" .delete-post-button", newPost))

            },error:function(error){
                console.log("error="+error.responseText);
            }

        });
        
        
        }); 
 
    }


let newPostDom = function(post){

    return $(`
            <li id="post-${post._id}">
                    <p>
                    <small>
            
                    <a class="delete-post-button" href="/post/destroy/${post._id}" >X</a>
            
                    </small>

                    ${post.content}
                    <br/>
                    <small>
                    ${post.user.name}
                    </small>
                    </p>
                    <div class="post-comments"> 
            
                    <form action="/comment/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment..."  required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add value">
                    </form>
            
            
                    <div id="posts-comments-list" >
                    <ul  id="posts-comments-${post._id}">
            
                    </ul>
                    </div>
            
                    </div>    
            </li>
     `)


}


    let deletePost = function(deleteLink) {
     
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({

                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data) {
                    console.log("post="+data.data.post_id);
                    $(`#post-${data.data.post_id}`).remove();

                },error:function(error){
                    console.log("error="+error.responseText);
                }
    
            });

        });

    }





    createPost();
  


}