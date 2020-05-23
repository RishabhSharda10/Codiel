const express = require('express');
const router = express.Router();
const passport = require('passport');


const userControllers = require('../controllers/user_controller');


router.get('/profile',passport.checkAuthentication,userControllers.profile);
router.get('/sign-up',userControllers.signup);
router.get('/sign-in',userControllers.signin);
router.get('/sign-out',userControllers.destroySession);
router.post('/create',userControllers.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), userControllers.createSession);



module.exports = router;