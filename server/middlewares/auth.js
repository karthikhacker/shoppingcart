const expressJwt = require('express-jwt');

// Require Auth
exports.requireAuth = expressJwt({
   secret : process.env.JWT_SECRET,
   requestProperty : 'auth'
})


//Is Admin
exports.isAdmin = (req,res,next) => {
  if(req.profile.role === 'User'){
    return res.status(401).json({ error : 'Admin only'})
  }
  next();
}
