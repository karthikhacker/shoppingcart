const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
   name : {
     type : String,
     required : 'Name is required',
     trim : true,
     unique : 'Name already exists'
   }
},{timestamps : true})

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category',categorySchema);
