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
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path: 'user'
        }
    })
    .exec(function(err, posts){
         return res.render('home', {
              title: "Codial | Home",
              posts: posts
         });
    })
//     exec is a callback function present there
} 
// module.exports.home = async function(req, res){

//     try{
//         // populate the user of each post
//         let posts = await Post.find({})
//         .sort('-createdAt')
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         });
        
//         let users = await User.find({});
//         console.log(posts[0].comments);
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts:  posts,
//             all_users: users
//         });

//     }catch(err){
//         console.log('Error', err);
//         return;
//     }
   
// }