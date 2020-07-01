const User = require('../models/user');
const config = require('../config/db');
const Address = require('../models/address');
const _ = require('lodash');
const getErrorMessage = require('../helpers/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

require('dotenv').config()

// user signup
exports.signup =  (req,res) => {
  //Check user
  User.findOne({ email :  req.body.email}).exec((err,user) => {
     if(user){
       res.status(400).json({ message : 'User already exists'})
     }
     if(!user){
       const {name,email,password,location} = req.body
       if(name === ""){
          return res.status(400).json({ message : "Name is required"})
       }else if(email === ""){
         return res.status(400).json({ message : "Email is required"})
       }else if(password === ""){
          return res.status(400).json({ message : "Password is required"})
       }else{
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
         //const password = hash;
         //generate token
         const token = jwt.sign({name,email,password,location},config.JWT_ACCOUNT_ACTIVATION,{expiresIn : '10m'})

         // send activation email
         const emailData = {
            from : config.EMAIL_FROM,
            to : email,
            subject : 'Account activation link',
            text : 'Hi',
            html : `
                     <p>Please use following link to activate your account</p>
                     <p>${config.CLIENT_URL}/auth/activate/${token}</p>
                     <hr />
                     <p>Thank you</p>
                   `
         }
         sgMail.send(emailData).then((sent) => {
            console.log(sent)
            return res.status(200).json({ message : `Verification email sent to ${email} ` })
         })
         .catch(error => {
            return res.status(400).json(error)
         })
       }
     }else{
       return res.status(400).json({ message : 'Something went wrong,try again'})
     }
  })
}

//Account activation
exports.accountActiation = (req,res) => {
  const {token} = req.body;
  if(token){
    jwt.verify(token,config.JWT_ACCOUNT_ACTIVATION,function(err,decoded){
       if(err){
         return res.status(401).json({ message : 'Activation link expired. Signup again' })
       }


       const {name,email,password} = jwt.decode(token);
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt);
       const user = new User({
          name,
          email,
          password : hash
       })
       user.save((err,user) => {
         if(err){
           return res.status(400).json({ message : getErrorMessage(err)})
         }
         res.status(200).json(user)
       })
    })
  }else{
     return res.status(401).json({ message : 'Something went wrong.try again.'})
  }
}

//Forget password
exports.forgotPassword = (req,res) => {
  //find user
  const {email} = req.body;
  User.findOne({email},(err,user) => {
     if(err){
       return res.status(400).json({ message : "OOPS" })
     }
     //generate token
     const token = jwt.sign({_id :  user._id,name : user.name},config.JWT_RESET_PASSWORD,{expiresIn : '10m'})
     const emailData = {
        from : process.env.EMAIL_FROM,
        to : email,
        subject : 'Password reset  link',
        text : 'Hi',
        html : `
                 <p>Please use following link to reset your password</p>
                 <p>${config.CLIENT_URL}/auth/password/reset/${token}</p>
                 <hr />
                 <p>Thank you</p>
               `
     }
     return user.updateOne({ resetPasswordLink : token},(err) => {
        if(err){
          return res.status(400).json(err)
        }else{
          sgMail.send(emailData).then((sent) => {
             console.log(sent)
             return res.status(200).json({ message : `Password reset link  sent to ${email} ` })
          })
          .catch(error => {
             return res.status(400).json(error)
          })
        }
     })
  })
}

//Restpassword
exports.resetPassword = (req,res) => {
  //
  const {resetPasswordLink,newPassword} = req.body;
  if(resetPasswordLink){
    jwt.verify(resetPasswordLink,config.JWT_RESET_PASSWORD,(err,decoded) => {
       if(err){
         return res.status(400).json({ message : "Expired link try again"})
       }
       User.findOne({resetPasswordLink},(err,user) => {
          if(err){
            return res.status(400).json({ message  : 'Something went wrong try again'})
          }
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.newPassword, salt);
          const newPassword = hash;
          const updatedFields = {
            password  : newPassword,
            resetPasswordLink : ""
          }
          user = _.extend(user,updatedFields)
          user.save((err,result) => {
             if(err){
               return res.status(400).json({ message : 'Something went wrong'})
             }
             res.status(200).json({ message : 'Password updated'})
          })
       })
    })
  }
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
