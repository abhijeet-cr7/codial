const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}
// created some options above

passport.use(new JWTStrategy(opts, function(jwtPayLoad , done){
  User.findById(jwtPayLoad._id, function(err,user)
  {
    //   jwytpayload ke andar id rehta hai pehle se aur yaha email aur password nahi le rahe local auth jaise kyuki yaha jwt header mein hi sara information hai.
      if(err)
      {
        console.log('Error in finding user from JWT');
        return;
      } 
      if(user)
      {
        return done(null, user);
      }else{
        return done(null, false);
      }
  })
}));

module.exports = passport;