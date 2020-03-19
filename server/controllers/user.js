const User = require('../models/user');
const getErrorMessage = require('../helpers/errorHandler');

// user signup
exports.signup = (req,res) => {
  const user = new User(req.body);
  user.save((err,user) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err) })
     }
     res.status(200).json(user);
  })
}
