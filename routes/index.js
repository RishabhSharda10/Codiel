const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home_controller');

console.log("Router Loaded");

router.get('/home',homeControllers.home);


module.exports = router;