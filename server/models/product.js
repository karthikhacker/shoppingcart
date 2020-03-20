const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
   name : {
     type : String,
     required : 'Product name is required',
     trim : true,
     unique : 'Product already exists '
   },
   category : {
     type : ObjectId,
     ref : 'Category',
     required : 'Category is required'
   },
   productImage : {
     type : [String],
     validate : {
       validator : function(v){
         return v.length > 0
       },
       message : 'Product image is required'
     }
   },
   price : {
     type : Number,
     required : 'Price is required'
   },
   description : {
     type : String,
     required : 'Description is required'
   },
   quantity : {
      type : Number
   }
})
productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product',productSchema);
