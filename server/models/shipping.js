const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  selectedAddress : {type : mongoose.Schema.ObjectId, ref : "Address",required : true}
},{timestamps : true})


module.exports = mongoose.model('Shipping',shippingSchema);
