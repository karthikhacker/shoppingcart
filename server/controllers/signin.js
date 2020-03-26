const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signin = (req,res) => {
  User.findOne({ email : req.body.email},(err,user) => {
     if(err || !user){
        return res.status(400).json({ error : 'User not found'})
     }
     if(user){
       const validPassword = user.comparePassword(req.body.password);
       if(!validPassword){
         return res.status(400).json({ error : 'oops password didnt match '})
       }else{
         const token = jwt.sign({
           _id : user._id,
           email : user.email
         },process.env.JWT_SECRET);
         res.status(200).json({ token :  token, user })
       }
     }
  })
}
//current user
exports.user = (req,res) => {
  User.findById(req.user._id)
   .select('-password')
   .exec((err,user) => {
     if(err){
       return res.status(400).json({ error : 'User not found' })
     }
     res.status(200).json(user)
   })
}
