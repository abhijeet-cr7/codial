const express = require("express");
const router = express.Router();
const passport = require('passport');
const friendsController = require('../controllers/friends_controller')

router.post('/add-friend', passport.checkAuthentication,friendsController.addFriend);

module.exports = router;