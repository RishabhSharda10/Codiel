const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user_controller');


router.get('/profile',userControllers.profile);


module.exports = router;