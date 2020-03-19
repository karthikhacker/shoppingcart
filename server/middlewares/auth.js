const expressJwt = require('express-jwt');

// Require Auth
exports.requireAuth = expressJwt({
   secret : process.env.JWT_SECRET,
   requestProperty : 'auth'
})

// Is Auth
exports.isAuth = (req,res,next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!user){
    return res.status(401).json({ error : 'Not Authorized'})
  }
  next();
}
//Is Admin
exports.isAdmin = (req,res) => {
  if(req.profile.role === 'User'){
    return res.status(401).json({ error : 'Admin only'})
  }
  next();
}
