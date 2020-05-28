const express = require('express');
const router = express.Router();
const passport = require('passport');

const {create,update} = require('../controllers/order');
const {addOrderToUserHistory} = require('../controllers/user');

router.post('/order/create',passport.authenticate('jwt',{session : false }),create);
router.put('/order/update/:id',passport.authenticate('jwt',{session : false}),update);

module.exports = router;
