const express = require('express');
const passport = require('passport');
const router = express.Router();

const { signup,addAddress,getAddress,removeAddress, add, read } = require('../controllers/user');
const { signin, userProfile,orderByUser } = require('../controllers/signin');

//auth middleware
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/user/profile', passport.authenticate('jwt',{session : false}),  userProfile);
router.post('/add/address',passport.authenticate('jwt',{session : false}),addAddress);
router.get('/address',passport.authenticate('jwt',{session : false}),getAddress);
router.delete('/address/:addressId',passport.authenticate('jwt',{session : false}),removeAddress);
router.post('/shipping/address',passport.authenticate('jwt',{session : false}),add)
router.get('/shipping/address',passport.authenticate('jwt',{session : false}),read);
router.get('/user/order',passport.authenticate('jwt',{session:false}),orderByUser)
module.exports = router;
