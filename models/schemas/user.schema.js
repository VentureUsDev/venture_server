'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const UserSchema = {
  phone:          {type: String, unique: true, minlength: 10, maxlength: 16, index: true},
  email:          {type: String, unique: true, maxlength: 254},
  password:       {type: String, minlength: 6, maxlength: 254},
  verified:       {type: Boolean, default: false},
  firstName:      {type: String, maxlength: 64},
  lastName:       {type: String, maxlength: 64},
  code:           {type: String},
  noticeOff:      {type: Boolean, default: false},
  emailOff:       {type: Boolean, default: false},
}

module.exports = new mongoose.Schema(
  UserSchema,
  schemaOption('timestamps', 'transform')
)
