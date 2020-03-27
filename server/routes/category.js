const express = require('express');
const router = express.Router();
const passport = require('passport');

const  {create } = require('../controllers/category');


router.post('/create/category', passport.authenticate('jwt',{session : false }),  create);

module.exports = router;
