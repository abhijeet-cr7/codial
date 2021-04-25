const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          //    handle error
          if (err) {
            console.log("error here in comment controllers", err);
            return;
          }
          // console.log(comments);
          console.log(post);
          post.comments.push(comment);
          // upar wala functionality provide karta hai mongo hmlog ko usse hoga ye ki push hojaega comment sidha posts mein
          post.save();
          // upar save kya karega ki sidha save krega database mein nahi to aisehi sirf ye local storage mein rahega
          res.redirect("/");
        }
      );
    }
  });
};

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
