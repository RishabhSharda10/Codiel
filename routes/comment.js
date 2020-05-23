const express = require('express');
const router = express.Router();
const passport = require('passport');


const commentsControllers = require('../controllers/comments_controller');

console.log("Routes Reached");
router.post('/create',passport.checkAuthentication,commentsControllers.create);




module.exports = router;