const express = require('express');
const router = express.Router();
const  {create } = require('../controllers/category');

const { requireAuth, isAdmin }  = require('../middlewares/auth');

router.post('/create/category', requireAuth, isAdmin, create);

module.exports = router;
