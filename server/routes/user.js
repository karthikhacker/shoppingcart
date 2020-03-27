const express = require('express');
const passport = require('passport');
const router = express.Router();

const { signup } = require('../controllers/user');
const { signin, currentUser } = require('../controllers/signin');

//auth middleware
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/user', passport.authenticate('jwt',{session : false}),  currentUser)

module.exports = router;
