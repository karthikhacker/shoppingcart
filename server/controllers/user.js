const User = require('../models/user');
const Address = require('../models/address');
const getErrorMessage = require('../helpers/errorHandler');
const bcrypt = require('bcryptjs');


// user signup
exports.signup = async (req,res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name : req.body.name,
    email : req.body.email,
    password : hash,
    location : req.body.location
  });
  user.save((err,user) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err) })
     }
     res.status(200).json({ message : 'Account created',user});
  })
}

//add user address
exports.addAddress = (req,res) => {
   const address = new Address({
      user : req.user._id,
      name : req.body.name,
      mobileNumber : req.body.mobileNumber,
      houseNo : req.body.houseNo,
      street : req.body.street,
      locality : req.body.locality,
      city : req.body.city,
      state : req.body.state,
      pincode : req.body.pincode
   });
   address.save((err,address) => {
      if(err){
         return res.status(400).json({ error : getErrorMessage(err) })
      }
       res.status(200).json(address);
   })
}
//get address
exports.getAddress = (req,res) => {
   Address.find({ user : req.user._id},(err,address) => {
     if(err){
       return res.status(400).json({ message : getErrorMessage(err) })
     }
     res.status(200).json(address);
   })
}

//get single Address
exports.read = (req,res) => {
  //
  Address.findOne({ _id : req.params.addressId})
   .exec((err,address) => {
     if(err){
       return res.status(400).json({ message : 'Address not found'})
     }
     res.status(200).json(address);
   })
}

//Remove address
exports.removeAddress = (req,res) => {
   Address.remove({_id : req.params.addressId},(err) => {
      if(err){
        return res.status(400).json({error : getErrorMessage(err)})
      }
      res.status(200).json({ message : 'Address deleted.' })
   })
}

//Edit address
exports.edit = (req,res) => {
  const id = {_id : req.params.addressId};
  const data = {
    name : req.body.name,
    mobileNumber : req.body.mobileNumber,
    houseNo : req.body.houseNo,
    street : req.body.street,
    locality : req.body.locality,
    city : req.body.city,
    state : req.body.state,
    pincode : req.body.pincode
  }
  Address.findOneAndUpdate(id,data,(err) => {
     if(err){
       return res.status(400).json({ message : 'Error in updating the data.' })
     }
     res.status(200).json({ message : 'Address updated' })
  })
  //console.log(id,data)
}
