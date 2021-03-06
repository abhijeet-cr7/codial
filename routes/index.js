const express = require("express");
// const express = require('express');
const router = express.Router();
// above is a  module which helps us separate our app route and the controller
const homeController = require("../controllers/home_controllers");
// const sign_up_controllers = require('../controllers/sign_up_controllers');
// const usersController = require("../controllers/users_controllers");

// router.get('/users', usersController.profile);

console.log("Router Loaded");

router.get("/", homeController.home);
// router.get('/signup', sign_up_controllers.sign_up);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));
router.use("/api", require("./api"));
router.use("/friends",require("./friends"));
// for any further routes, access from here
// router.use('/routerName, require('./routerfile));
module.exports = router;

