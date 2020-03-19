const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { requireAuth,  isAdmin } = require('../middlewares/auth');
const { userById } = require('../controllers/user');

router.post('/create/:userId',requireAuth, isAdmin, create);
router.param('userId',userById)

module.exports = router;
