const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
  User.findById(req.params.id, function(err, user){
      return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
      });
  });
}

module.exports.update = async function(req, res){
   if(req.user.id == req.params.id)
   {
   try{
     let user = await User.findById(req.params.id);
     User.uploadedAvatar(req,res, function(err){
    //  upar uploadedavatar wala function isilie use hua hai kyuki multi part form hai
     if(err)
     {
     console.log('******Multer Error: ', err)
     }
     console.log(req.file);
     user.name = req.body.name;
     user.email = req.body.email;
     if(req.file)
     {
    if(user.avatar)
    {
    fs.unlinkSync(path.join(__dirname, '..', user.avatar))
    }
    //  this below is saving the path of the uploaded file into the avatar field in the user
    user.avatar = User.avatarPath + '/' + req.file.filename
     }
     user.save();
     return res.redirect("back");
     });
    }catch(err){
     return res.redirect("back");
   }
   }else{
     return;
   }

}
// render the signup page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codiel / Signup",
  });
};
// render the signin page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codiel / SignIn",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in creating user while signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        // if(!user){
        //     User.create(req.body, function(err, user){
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
// sign in and create session for user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully')
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'You have logged out!');
  // upar wala method passport provide krta hai request ko
  return res.redirect("/");
};
