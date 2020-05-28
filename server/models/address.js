const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.ObjectId, ref : "User"},
   name : {
     type : String,
     required : 'Name is required',
     trim : true
   },
   mobileNumber : {type : Number, required : true},
   houseNo : {type : Number,required : true},
   street : {type : String, required : true},
   locality : {type : String,required : true},
   city : {type : String,required : true},
   state : {type : String,required : true},
   pincode : {type : Number, required : true}
},{timestamps : true})


module.exports = mongoose.model('Address',addressSchema);
