const Comment = require('Comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
   Post.findById(req.body.post, function (err, post){
       if(post){
           Comment.create({
               content: req.body.content,
               post: req.body.post,
               user: req.user._id
           }, function(err, comment){
            //    handle error
            post.comment.push(comment);
            // upar wala functionality provide karta hai mongo hmlog ko usse hoga ye ki push hojaega comment sidha posts mein
            post.save();
            // upar save kya karega ki sidha save krega database mein nahi to aisehi sirf ye local storage mein rahega 
           })
       }
   })
}