const Order = require('../models/order');
const User = require('../models/user');
const getErrorMessage = require('../helpers/errorHandler');

// orderBId
exports.orderById = (req,res,next,id) =>{
  Order.findById(id)
  .exec((err,order) => {
     if(err || !order){
       return res.status(400).json({ error : getErrorMessage(err)})
     }
     req.order = order;
     next();
  })
}

//create order
exports.create = async (req,res) => {
  const user = await User.findOne({ _id : req.user._id})
  //res.json(user)
  //create order
   const order = new Order({
      user : req.user._id,
      products : req.body.products,
      transaction_id : req.body.transaction_id,
      amount : req.body.amount,
      address : req.body.address
   });
   await order.save();
   //push order to user
   user.history.push(order._id)
  await  user.save()
  res.json(order)
}

//List all orders
exports.list = (req,res) => {
  Order.find()
  .populate("user address","name email mobileNumber houseNo street locality city state pincode")
  .sort('-createdAt')
  .exec((err,orders) => {
    if(err){
      return res.status(400).json({ error : 'Order not found'})
    }
    res.status(200).json(orders)
  })
}

//order status
exports.orderStatus = (req,res) => {
  res.json(Order.schema.path("status").enumValues)
}

//update order status
exports.updateOrderStatus = (req,res) => {
  const id = {_id : req.params.orderId};
  const status = req.body;
  Order.findOneAndUpdate(id,status,(err) => {
     if(err){
        return res.status(400).json({ error : getErrorMessage(err)})
     }
     res.json({ message : 'Status updated' })
  })
  //console.log(id,status)
}
