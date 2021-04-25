const express = require("express");
const router = express.Router();
const passport = require('passport');
const usersController = require("../controllers/users_controllers");

router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
// use passport as a middleware to authenticate
router.post('/update/:id',passport.checkAuthentication, (req,res) => {usersController.update});
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);


router.post('/create-session', passport.authenticate(
     'local',
     // upar local passport ka strategy hai
     {failureRedirect: '/users/sign-in'},
),usersController.createSession);
router.get('/sign-out', usersController.destroySession); 
module.exports = router;