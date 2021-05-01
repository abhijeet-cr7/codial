const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){

  try{
      let post = await Post.findById(req.body.post);

      if (post){
          let comment = await Comment.create({
              content: req.body.content,
              post: req.body.post,
              user: req.user._id
          });

          post.comments.push(comment);
          post.save();
          
          if (req.xhr)
          {
          comment = await comment.populate('user', 'name').execPopulate();  
          return res.status(200).json({
             data : {
               comment: comment
             },
             message: "Post created!"
          });
          }

          req.flash('success', 'Comment published!');

          res.redirect('/');
      }
  }catch(err){
      req.flash('error', err);
      return;
  }
  
}

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        // above pull throws the id matching with the comment id.
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
