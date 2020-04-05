const express = require('express');
const router = express.Router();
const passport = require('passport');

const  {create,categories } = require('../controllers/category');
const  isAdmin  = require('../middlewares/isAdmin');

router.post('/create/category', passport.authenticate('jwt',{session : false }), isAdmin, create);
router.get('/categories',categories);
module.exports = router;
