const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');

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
   location : {type : String,required : 'Location is required.'},
   role : {
     type : String,
     enum : ['Admin','User'],
     default : 'User'
   }

})
userSchema.plugin(uniqueValidator);

//methods
userSchema.pre('save',function(next){
   var user = this;
   bcrypt.hash(user.password,null,null,function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
   })
});

//compare password
userSchema.methods.comparePassword = function(password){
    var user = this;
   return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User',userSchema);
