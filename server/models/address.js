const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.ObjectId, ref : "User"},
   name : {
     type : String,
     required : 'Name is required',
     trim : true
   },
   mobileNumber : {type : Number, required : "Mobile number required"},
   houseNo : {type : String,required : "House no required."},
   street : {type : String, required : "Street name is reuired."},
   locality : {type : String,required : "LOCALITY is required."},
   city : {type : String,required : "city is required."},
   state : {type : String,required : "State is required."},
   pincode : {type : String, required : "Pincode is required."}
},{timestamps : true})


module.exports = mongoose.model('Address',addressSchema);
