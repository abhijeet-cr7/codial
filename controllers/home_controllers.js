const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
//    Post.find({}, function(err, posts){
//         return res.render('home', {
//                title: "Codial | Home",
//                posts : posts
//         });
//    });
//  populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        console.log(posts);
         return res.render('home', {

              title: "Codial | Home",
              posts: posts
         });
    })
//     exec is a callback function present there
// bro can u call 6382729470 ok give me a min
} 