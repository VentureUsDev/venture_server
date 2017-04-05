const mongoose   = require('mongoose')
const bcrypt     = require('bcryptjs')
const crypto     = require('crypto')
const User       = require('./schemas/user.schema')
const worker     = require('../worker')
mongoose.Promise = global.Promise

User.methods.generateOTP = function() {
  // TODO: make this short-lived - expire it
  this.code = crypto.randomBytes(3).toString('hex')
  return this.save()
}

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

User.methods.checkExisting = function(user) {
  if(user && user.verified) throw new Error('User already exists')
  return user
}

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

User.statics.findByPhone = function(phone) {
  if (phone instanceof Array) {
    return this.find({phone: {$in: phone}}).exec()
  } else {
    return this.findOne({ phone }).exec()
  }
}

module.exports = mongoose.model('User', User)
