const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home_controller');

console.log("Router Loaded");

router.get('/',homeControllers.home);


router.use('/user',require('./user'));

module.exports = router;