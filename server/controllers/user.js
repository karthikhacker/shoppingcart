const User = require('../models/user');
const Address = require('../models/address');
const getErrorMessage = require('../helpers/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config()



// user signup
exports.signup = async (req,res) => {
  //Check user
  User.findOne({ email :  req.body.email}).exec((err,user) => {
     if(user){
       res.status(400).json({ message : 'User already exists'})
     }
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.password, salt);
     const {name,email,password,location} = req.body
     //const password = hash;
     //generate token
     const token = jwt.sign({name,email,password,location},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn : '10m'})
     // send activation email

     var transporter = nodemailer.createTransport({
         service: "Gmail",
         auth: {
           user: 'karthik.sundararajan85@gmail.com', // generated ethereal user
           pass: 'hacker24', // generated ethereal password
          },
     });
     const emailData = {
       from : 'karthik.sundararajan85@gmail.com',
       to : 'karthik.arm7@gmail.com',
       submit : 'Account activation email',
       text: "Some uselss text",
       html: `
             <p>Use following link to activate your account</p>
             <p>${process.env.CLIENT_URL}/auth/activate</p>
       `
     }
     transporter.sendMail(emailData, function(error, info){
      if (error) {
        console.log(error);
      } else {
        //res.status(200).json({ message : 'Email send ' + info.response})
        console.log(info.response)
      }
    });

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
