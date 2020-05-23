const express = require('express');
const router = express.Router();
const passport = require('passport');


const postsControllers = require('../controllers/posts_controller');


router.post('/create',passport.checkAuthentication,postsControllers.create);
router.get('/destroy/:id',passport.checkAuthentication,postsControllers.destroy);




module.exports = router;