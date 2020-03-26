const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user');
const { signin,user } = require('../controllers/signin');

//auth middleware
const { requireAuth } = require('../middlewares/auth');
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/user', requireAuth, user)

module.exports = router;
