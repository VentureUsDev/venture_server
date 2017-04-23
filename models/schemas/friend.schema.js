'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const FriendSchema = {
  owner:      {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  friend:     {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  nickname:   {type: String, minlength: 2, maxlength: 16},
  accepted:   {type: Boolean, default: true},
}

module.exports = new mongoose.Schema(
  FriendSchema,
  schemaOption('timestamps')
)
