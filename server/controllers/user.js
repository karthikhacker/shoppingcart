const User = require('../models/user');
const Address = require('../models/address');
const Shipping = require('../models/shipping');
const getErrorMessage = require('../helpers/errorHandler');


// user signup
exports.signup = (req,res) => {
  const user = new User(req.body);
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
   Address.find()
    .exec((err,address) => {
       if(err){
         return res.status(400).json({ error : getErrorMessage(err)})
       }
       res.status(200).json(address)
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

//add shipping address
exports.add = (req,res) => {
    const shipping = new Shipping({
      selectedAddress : req.body.selectedAddress
    });
    shipping.save((err) => {
       if(err){
         return res.status(400).json(err)
       }
       res.status(200).json({ message : 'Shipping address addded'})
    })
    /console.log(req.body)
}

//get shipping address
exports.read = (req,res) => {
  Shipping.find()
   .populate('address')
   .exec((err,shippingaddress) => {
      if(err){
        return res.status(400).json(err)
      }
      res.status(200).json(shippingaddress)
   })
}
