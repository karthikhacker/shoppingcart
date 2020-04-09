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
           id : user.id,
           name : user.name,
           email : user.email,
           role : user.role
         },process.env.JWT_SECRET);
         res.status(200).json({ token : 'Bearer ' +  token, user })
       }
     }
  })
}
//current user
exports.currentUser = (req,res) => {
  return res.json({
     id : req.user._id,
     name : req.user.name,
     email : req.user.email,
     role : req.user.role
  })
}
//
