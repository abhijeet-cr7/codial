let createComment = function()
{
let newCommentForm = $('#new-comment-form');
newCommentForm.submit((e) => {
  e.preventDefault();
  $.ajax({
      type: 'post',
      url : '/comments/create',
      data : newCommentForm.serialize(),
      success : function(data)
      {
      console.log(data);
      let newComment = newCommentDom(data.data.comment);
      


      },
      error : function(error)
      {
        console.log(error.responseText);
      }
  })
})
}

let newCommentDom = function(comment)
{
console.log('aagya');
return (`<li>
<p>
  <small>
    <a href="/comments/destroy/${comment._id}">X</a>
  </small>
    ${comment.content}
  <br />
  <small>${comment.user.name}</small>
</p>
</li>`)
}
createComment();