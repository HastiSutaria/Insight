const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    role:{
      type : String,
    }
    
  },
  { timestamps: true })

  module.exports = mongoose.model('User', UserSchema ,'userscol')