const User = require('../models/user');
const Friendship = require('../models/friendship');
const { newComment } = require('../mailers/comments_mailer');

module.exports.addFriend = async function(req,res)
{
try{
let existingFriend = await Friendship.findOne({
    from_user : req.user,
    to_user : req.query.id,
});
console.log(`existing friend**** ${existingFriend}`);
let toUser = await User.findById(req.query.id);
let fromUser = await User.findById(req.user._id);

let deleted = false;

if(existingFriend)
{
    toUser.friendships.pull(existingFriend._id);
    fromUser.friendships.pull(existingFriend._id);
    toUser.save();
    fromUser.save();
    existingFriend.remove();
    deleted = true;
}
else{
 let newfriend = await Friendship.create({
     from_user : req.user.id,
     to_user : req.query.id
 });
  console.log('newfriend*****',newfriend);   
  toUser.friendships.push(newfriend);
  fromUser.friendships.push(newfriend);
  toUser.save();
  fromUser.save();
  console.log('reached here');
}

if(req.xhr)
{
    return res.status(200).json({
        deleted : deleted,
        message : "Request Successful",
    });
}
return res.redirect("back")
}
catch(err)
{
console.log(`Error in here ******${err}`);
}
}