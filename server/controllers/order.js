const Order = require('../models/order');
const getErrorMessage = require('../helpers/errorHandler');

//create order
exports.create = (req,res) => {
   const order = new Order({
      user : req.user._id,
      products : req.body.products,
      transaction_id : req.body.transaction_id,
      amount : req.body.amount,
      address : req.body.address
   });
   order.save((err,order) => {
      if(err){
         return res.status(400).json({ error : getErrorMessage })
      }
      res.status(200).json(order)
   })
}
