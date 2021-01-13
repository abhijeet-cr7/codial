const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
// const sign_up_controllers = require('../controllers/sign_up_controllers');
// const usersController = require("../controllers/users_controllers");

// router.get('/users', usersController.profile);

console.log('Router Loaded');

router.get('/', homeController.home);
// router.get('/signup', sign_up_controllers.sign_up);
router.use('/users', require('./users'));

// for any further routes, access from here
// router.use('/routerName, require('./routerfile));
module.exports = router;

//  can we talk on call??num? m ha se portal pr generate krti hu call okay?haan okay
