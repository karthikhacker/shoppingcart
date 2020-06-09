const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Order = require('../models/order');

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
exports.userProfile = async (req,res) => {
   const user = await User.findOne({ _id : req.user._id });
   res.json(user)
}

// get order
exports.orderByUser = (req,res) => {
  Order.find({ user : req.user._id })
       .populate("user address","name email mobileNumber houseNo street locality city state pincode")
       .exec((err,order) => {
         if(err || order.length < 1){
           return res.status(400).json({ error : 'No Orders'})
         }
         res.json(order)
       })

}
