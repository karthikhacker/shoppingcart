const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Order = require('../models/order');
const bcrypt = require('bcryptjs');


exports.signin = (req,res) => {
  User.findOne({ email : req.body.email},(err,user) => {
     if(err || !user){
        return res.status(400).json({ error : 'User not found'})
     }
     if(user){
       const isMatch = bcrypt.compareSync(req.body.password, user.password); // true
       if(!isMatch){
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

//change password
exports.changePassword = (req,res) => {
  User.findOne({_id : req.user._id},(err,user) => {
     if(err){
        return res.status(400).json({ error : 'Error'})
     }
     if(user){
       const isMatch = bcrypt.compareSync(req.body.password, user.password); // true
       if(!isMatch){
         return res.status(400).json({ message : 'Old password didnt match'})
       }else{
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(req.body.newPassword, salt);
         const data = {
            password : hash
         }
         User.findOneAndUpdate({ _id : req.user._id},data,(err) => {
            if(err){
              return res.status(400).json({ error : 'Error'})
            }
            res.status(200).json({ message : 'Password updated'})
         })
       }
     }
  })
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(req.body.password, salt);
  // const data = { password : hash}
  // User.findOneAndUpdate({ _id : req.user._id},data,(err) => {
  //    if(err){
  //      return res.status(400).json({ message : 'Error'})
  //    }
  //    res.status(200).json({ message : 'Password updated'})
  // })
}

exports.update = (req,res) => {
  User.findOneAndUpdate({_id : req.user._id},{$set : req.body},{$new : true},(err) => {
     if(err){
       return res.status(200).json({ error : "Updating error"})
     }
     res.status(200).json({ message : 'Profile updated'})
  })
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
