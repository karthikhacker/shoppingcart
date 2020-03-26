const jwt = require('jsonwebtoken');
const User = require('../models/user');

//require auth
exports.requireAuth = (req,res,next) => {
  const token = req.header('x-auth-token');
  if(!token){
    return res.status(401).json({ error : 'NOT AUTHORIZED'})
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(e){
     return res.status(400).json({ error : 'Invalid token'})
  }
}

//is admin
exports.isAdmin = (req,res,next) => {
  User.findById(req.user._id)
   .exec((err,user) => {
      if(user.role === 'User'){
         return res.status(401).json({ message : 'NOT AUTHORIZED, ADMIN ONLY'})
      }
      next();
   })
}
