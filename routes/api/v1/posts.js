const express = require('express');
const passport = require('passport');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt',{session : false}), postsApi.destroy);
// yaha session mein false isilie dalen hain kyuki session cookie store nahi hona chahie

module.exports = router;