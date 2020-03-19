const express = require('express');
const router = express.Router();

const { signup,userById } = require('../controllers/user');
const { signin } = require('../controllers/signin');
const { requireAuth } = require('../middlewares/auth');
//routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/secret/:userId',requireAuth,(req,res) => {
   res.json({ user : req.profile })
})
router.param('userId',userById)


module.exports = router;
