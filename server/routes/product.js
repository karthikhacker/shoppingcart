const express = require('express');
const router = express.Router();
const passport = require('passport');

const  { productImageUpload, createProduct, productById, read, remove } = require('../controllers/product');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/product/image', passport.authenticate('jwt',{session : false }), isAdmin, productImageUpload);
router.post('/create/product',passport.authenticate('jwt',{session : false}), isAdmin, createProduct);
router.get('/product/:productId',read);
router.delete('/product/:productId',passport.authenticate('jwt',{session : false }), isAdmin, remove)
router.param('productId',productById);
module.exports = router;
