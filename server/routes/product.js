const express = require('express');
const router = express.Router();
const passport = require('passport');

const  { productImageUpload, createProduct, productById, read, remove, update, list, listRelated, listBySearch } = require('../controllers/product');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/product/image', passport.authenticate('jwt',{session : false }), isAdmin, productImageUpload);
router.post('/create/product',passport.authenticate('jwt',{session : false}), isAdmin, createProduct);
router.get('/product/:productId',read);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.post('/products/by/search', listBySearch);
router.delete('/product/:productId',passport.authenticate('jwt',{session : false }), isAdmin, remove);
router.put('/product/:productId',passport.authenticate('jwt',{session : false }), isAdmin, update);

router.param('productId',productById);
module.exports = router;
