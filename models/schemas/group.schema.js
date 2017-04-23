'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const GroupSchema = {
  admin:        {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name:         {type: String, required: true, minlength: 2, maxlength: 32},
  members:      [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}

module.exports = new mongoose.Schema(
  GroupSchema,
  schemaOption('timestamps')
)
