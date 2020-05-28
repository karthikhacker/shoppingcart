const express = require('express');
const router = express.Router();
const passport = require('passport');

const  { getToken, processPayment } = require('../controllers/braintree');
router.get('/braintree/token',passport.authenticate('jwt',{session : false}),getToken);
router.post('/braintree/payment',passport.authenticate('jwt',{session : false}),processPayment);


module.exports = router;
