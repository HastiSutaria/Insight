const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
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
    role:{
      type : String,
    }
    
  },
  { timestamps: true })

  const Users = mongoose.model('User',UserSchema);

  module.exports = Users;