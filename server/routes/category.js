const express = require('express');
const router = express.Router();
const passport = require('passport');

const  {create,categories, categoryById, read, update, remove } = require('../controllers/category');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/create/category', passport.authenticate('jwt',{session : false }), isAdmin, create);
router.get('/categories',categories);
router.get('/category/:categoryId',read);
router.put('/category/:categoryId',passport.authenticate('jwt',{session : false}), isAdmin, update);
router.delete('/category/:categoryId',passport.authenticate('jwt',{session : false}), isAdmin, remove);

router.param('categoryId',categoryById)
module.exports = router;
