const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({

     usernameField: 'email',
    //  yaha par value provide kie hain email ka schema se
     passReqToCallback : true
    //  what the above thing does is that it helps us to take a request inside the callback function
},
function(req, email, password, done)
{
    // find a user and establish the identity
User.findOne({email: email}, function(err, user){
    if(err)
    {
        req.flash('error', err);
        return done(err);
    }
    if(!user || user.password != password)
    {
        req.flash('error', 'Invalid username/Password');
        return done(null, false);
        // second argument is authentication is false
    }
    return done(null,user);
});
}       
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);

});
// done is callback function which takes two arguments error and authentication 

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err)
        {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
// if the user is signed in, then pass on the request to the next function(controller's action)
if(req.isAuthenticated()){
    // passport provides the above method named as isAuthenticated
    return next();
}
// if the user is not signed in
return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if( req.isAuthenticated()){
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the  views
    res.locals.user = req.user;
     }
     next();
}

module.exports = passport; 