const express = require('express');
// const express = require('express');
const router = express.Router();
// above is a  module which helps us separate our app route and the controller 
const homeController = require('../controllers/home_controllers');
// const sign_up_controllers = require('../controllers/sign_up_controllers');
// const usersController = require("../controllers/users_controllers");

// router.get('/users', usersController.profile);

console.log('Router Loaded');

router.get('/', homeController.home);
// router.get('/signup', sign_up_controllers.sign_up);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
// for any further routes, access from here
// router.use('/routerName, require('./routerfile));
module.exports = router;

//  can we talk on call??num? m ha se portal pr generate krti hu call okay?haan okay
