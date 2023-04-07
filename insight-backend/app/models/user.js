const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String, 
      required: true
    },
    confirmPassword: {
      type: String, 
      required: true
    },
    acceptTerms: {
      type: Boolean,
      required: true
    },
    admin:{
      type : Boolean,
      default: false
    }
    
  },
  { timestamps: true })

  UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

UserSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}



  const User = mongoose.model('User',UserSchema);

  module.exports = User;