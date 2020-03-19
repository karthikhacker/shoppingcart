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
           id : user._id,
           email : user.email,
           name : user.name,
           role : user.role
         },process.env.JWT_SECRET);
         res.cookie("t", token, {
             expire: new Date() + 9999
         })
         res.status(200).json({ token : 'Bearer ' + token, user })
       }
     }
  })
}
