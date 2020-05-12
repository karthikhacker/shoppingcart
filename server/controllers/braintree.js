const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config()

//braintree connect
const gateway = braintree.connect({
   environment : braintree.Environment.Sandbox,
   merchantId : process.env.BRAINTREE_MERCHANT_ID,
   publicKey : process.env.BRAINTREE_PUBLIC_KEY,
   privateKey: process.env.BRAINTREE_PRIVATE_KEY
})
//generateToken
exports.generateToken = (req,res) => {
   gateway.clientToken.generate({},function(err,response){
      if(err){
        return res.status(500).json(err)
      }
       res.status(200).json(response)
   })
}
//processPayment
exports.processPayment = (req,res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  let newTranscation = gateway.transaction.sale({
     amount : amountFromTheClient,
     paymentMethodNonce :nonceFromTheClient ,
     options: {
    submitForSettlement: true
  }
},(error,results) => {
   if(error){
     res.status(500).json(error)
   }
    res.status(200).json(results)
})
}
