const express = require('express');
const router = express.Router();

const { signup,userById } = require('../controllers/user');
const { signin } = require('../controllers/signin');
const { requireAuth } = require('../middlewares/auth');
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.param('userId',userById)
module.exports = router;
