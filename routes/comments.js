const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentsController = require('../controllers/comment_controllers');

router.post('/create',passport.checkAuthentication,commentsController.create);


module.exports = router;