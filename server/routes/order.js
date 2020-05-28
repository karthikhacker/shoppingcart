const express = require('express');
const router = express.Router();
const passport = require('passport');

const {create,update} = require('../controllers/order');

router.post('/order/create',passport.authenticate('jwt',{session : false }),create);

module.exports = router;
