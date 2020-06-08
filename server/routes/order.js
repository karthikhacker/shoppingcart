const express = require('express');
const router = express.Router();
const passport = require('passport');

const {create,list,orderStatus,updateOrderStatus,orderById} = require('../controllers/order');

const  isAdmin  = require('../middlewares/isAdmin');

router.post('/order/create',passport.authenticate('jwt',{session : false }),create);
router.get('/orders',passport.authenticate('jwt',{session : false}), list);
router.get('/orders/status',passport.authenticate('jwt',{session : false}), isAdmin,orderStatus);
router.put('/order/:orderId',passport.authenticate('jwt',{session : false}), isAdmin,updateOrderStatus);

router.param('orderId',orderById);
module.exports = router;
