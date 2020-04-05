const express = require('express');
const router = express.Router();
const passport = require('passport');

const  { productImageUpload, createProduct } = require('../controllers/product');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/product/image', passport.authenticate('jwt',{session : false }), isAdmin, productImageUpload);
router.post('/create/product',passport.authenticate('jwt',{session : false}), isAdmin, createProduct);
module.exports = router;
