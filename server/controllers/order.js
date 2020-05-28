const Order = require('../models/order');
const getErrorMessage = require('../helpers/errorHandler');

//create order
exports.create = (req,res) => {
  const order = new Order({
     user : req.user._id,
     products : req.body.products,
     address : req.body.address,
     transaction_id : req.body.transaction_id,
     amount : req.body.amount
  })
   order.save((err,order) => {
      if(err){
        return res.status(400).json({ error : getErrorMessage(err) })
      }
      res.status(200).json(order)
   })
}
//update order
exports.update = (req,res) => {
   // Order.findById(req.params.id,(err,order) => {
   //    if(err || !order){
   //      return res.status(400).json({ error : 'Order not found'})
   //    }
   //
   //      order.user = req.user._id;
   //      order.products = req.body.products;
   //      order.address = req.body.address;
   //      order.transaction_id  = req.body.transaction_id;
   //      order.amount = req.body.amount;
   //      order.save((err,order) => {
   //         if(err){
   //           return res.status(400).json({ error : getErrorMessage(err)})
   //         }
   //         res.status(200).json(order)
   //      })
   //
   // })
   const order = {
      user : req.user._id,
      products : req.body.products,
      address : req.body.address,
      transaction_id : req.body.transaction_id,
      amount : req.body.amount
   }
   Order.findOneAndUpdate({_id : req.params.id},order,(err,data) => {
      if(err){
        return res.status(400).json({ error : 'Order not found' })
      }
      res.status(200).json(data)
   })
}
