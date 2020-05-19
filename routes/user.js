const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user_controller');


router.get('/profile',userControllers.profile);
router.get('/sign-up',userControllers.signup);
router.get('/sign-in',userControllers.signin);
router.post('/create',userControllers.create);
router.post('/create-session',userControllers.createSession);


module.exports = router;