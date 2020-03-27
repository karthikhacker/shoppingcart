const express = require('express');
const router = express.Router();
const passport = require('passport');

const  {create } = require('../controllers/category');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/create/category', passport.authenticate('jwt',{session : false }), isAdmin, create);

module.exports = router;
