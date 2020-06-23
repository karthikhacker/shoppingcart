const express = require('express');
const router = express.Router();
const passport = require('passport');

const  { productImageUpload, createProduct, productById, read, remove, update, listBySell, listLatest, listRelated, listBySearch, productList, categoryByProduct } = require('../controllers/product');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/product/image', passport.authenticate('jwt',{session : false }), isAdmin, productImageUpload);
router.post('/create/product',passport.authenticate('jwt',{session : false}), isAdmin, createProduct);
router.get('/product/:productId',read);
router.get('/products/sell', listBySell);
router.get('/products/latest', listLatest);
router.get('/products/related/:productId', listRelated);
router.post('/products/by/search', listBySearch);
router.get('/products',productList);
router.delete('/product/:productId',passport.authenticate('jwt',{session : false }), isAdmin, remove);
router.put('/product/:productId',passport.authenticate('jwt',{session : false }), isAdmin, update);
router.get('/products/by/category/:categoryId',categoryByProduct)
router.param('productId',productById);
module.exports = router;
