const braintree= require('braintree');
const config = require('../config/db');

const gateway = braintree.connect({
  environment : braintree.Environment.Sandbox,
  merchantId : config.BRAINTREE_MERCHANT_ID,
  publicKey : config.BRAINTREE_PUBLIC_KEY,
  privateKey : config.BRAINTREE_PRIVATE_KEY
})
//stripe payment
exports.getToken = (req,res) => {
   //
   gateway.clientToken.generate({},function(err,response){
      if(err){
        return res.status(400).json(err)
      }
      res.json(response)
})
}

//processPayment
exports.processPayment = (req,res) => {
  //
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromThenClient = req.body.amount

  let newTransaction = gateway.transaction.sale({
     amount :  amountFromThenClient,
     paymentMethodNonce : nonceFromTheClient,
     options : {
        submitForSettlement : true
     }
  },(err,result) => {
     if(err){
       return res.status(500).json(err)
     }
     res.json(result)
  })
}
