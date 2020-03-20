const express = require('express');
const router = express.Router();

const { image,create } = require('../controllers/product');
const { requireAuth,  isAdmin } = require('../middlewares/auth');
const { userById } = require('../controllers/user');

router.post('/product/image/:userId',requireAuth, isAdmin, image);
router.post('/product/create/:userId',requireAuth, isAdmin, create);

router.param('userId',userById)

module.exports = router;
