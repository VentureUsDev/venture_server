'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const FriendSchema = {
  owner:      {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  friend:     {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  accepted:   {type: Boolean, default: false},
}

module.exports = new mongoose.Schema(
  FriendSchema,
  schemaOption('timestamps')
)
