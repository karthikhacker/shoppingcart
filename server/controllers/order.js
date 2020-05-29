const Order = require('../models/order');
const User = require('../models/user');
const getErrorMessage = require('../helpers/errorHandler');

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
