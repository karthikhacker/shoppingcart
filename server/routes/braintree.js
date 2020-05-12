const express = require('express');
const router = express.Router();
const passport = require('passport');

const  isAdmin  = require('../middlewares/isAdmin');
const {generateToken,processPayment } = require('../controllers/braintree');

router.get('/braintree/getToken',passport.authenticate('jwt',{session : false }),generateToken);
router.post('/braintree/payment',passport.authenticate('jwt',{session : false }),processPayment);

module.exports = router;
