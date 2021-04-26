{
// method to submit the form data for new post using AJAX
let createPost = function () {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url : '/posts/create',
        data : newPostForm.serialize(),
        success: function(data){
            console.log(data);
            let newPost = newPostDom(data.data.post);
            $('#posts-list-container>ul').prepend(newPost);
            deletePost($(' .delete-post-button', newPost));
        }, error : function(error){
            console.log(error.responseText);
        }
    });
    });
}
    
// method to create a post in DOM
let newPostDom = function(post)
{
    return $(`<li id="post-${post._id}">
    <p>
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
      </small>
     ${post.content}
      <br />
      <!-- <li style="color:brown; list-style-type :none;"> -->
      <small>${post.user.name}</small>
    </p>
    <div class="post-comments">
      
    <form action="/comments/create" method="POST">
        <input
          type="text"
          name="content"
          placeholder="Type Here to add comment..."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <!-- upar wala input isilie lie hain taki postid de paen comment ko -->
        <input type="submit" value="Add Comment" />
        </form>
    
    </div>
    <div class="post-comments-list">
      <ul id="post-comments-${post._id%}">
        <%= console.log(post.comments) %> 
        <% for (comment of post.comments) { %>
        <!-- yaha upar post.comments isilie kie kyuki comments post k andar h -->
        <%- include ('_comment') -%>
        <% } %>
      </ul>
    </div>
  </li> `)
}
// method to delete a post from dom
let deletePost = function (deleteLink)
{
  $(deleteLink).click(function(e){
      e.preventDefault();
    $.ajax({
       type: 'get',
       url : $(deleteLink).prop('href'),
       success : function(data){
       $(`#post-${data.data.post_id}`).remove();
       },error : function (error){
      console.log(error.responseText);
       }
    });
    });
}
 createPost();
}