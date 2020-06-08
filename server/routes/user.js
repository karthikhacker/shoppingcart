const express = require('express');
const passport = require('passport');
const router = express.Router();

const { signup,addAddress,getAddress,removeAddress,edit,read } = require('../controllers/user');
const { signin, userProfile,orderByUser } = require('../controllers/signin');

//auth middleware
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/user/profile', passport.authenticate('jwt',{session : false}),  userProfile);
router.post('/add/address',passport.authenticate('jwt',{session : false}),addAddress);
router.get('/address',passport.authenticate('jwt',{session : false}),getAddress);
router.get('/address/:addressId',passport.authenticate('jwt',{session : false}),read);
router.put('/address/edit/:addressId',passport.authenticate('jwt',{session : false}),edit);
router.delete('/address/:addressId',passport.authenticate('jwt',{session : false}),removeAddress);
router.get('/user/order',passport.authenticate('jwt',{session:false}),orderByUser)
module.exports = router;
