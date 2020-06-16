const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new  mongoose.Schema({
   name : {
     type : String,
     required : 'Name is required',
     trim : true
   },
   email : {
     type : String,
     required : 'Email is required',
     trim : true,
     unique : 'Email already exists',
     validate : {
       validator : function(v){
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v)
       },
       message : 'Enter a proper email address'
     }
   },
   password : {
      type : String,
      required : 'Password is required',
      minlength : [6,'Password should be minimun 6 character']
   },
   about : {
      type : String
   },
   location : {type : String},
   role : {
     type : String,
     enum : ['Admin','User'],
     default : 'User'
   },
   passwordPasswordLink : {
     data : String,
     defaut : ''
   }

})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);
