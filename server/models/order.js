const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//oder schema
const orderSchema = new Schema({
   products : {type : Array},
   transaction_id: {},
    amount: { type: Number },
    user : {type : Schema.ObjectId,ref : 'User'},
    address: {type : Schema.ObjectId,ref: 'Address'},
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
},{timestamps : true})
const Order = mongoose.model('Order',orderSchema);

module.exports = Order;
