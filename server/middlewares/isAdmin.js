//is Admin
  module.exports = (req,res,next) => {
  const {role} = req.user;
  if(role === 'Admin'){
    next();
  }else{
    res.status( 401).json({ message : 'NOT AUTHORIZED, ADMIN ONLY'})
  }
}
