'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const LocationSchema = {
  street  : {type: String, maxlength: 64},
  unit    : {type: String, maxlength: 8},
  zip     : {type: String, maxlength: 8},
  city    : {type: String, maxlength: 16},
  state   : {type: String, default: 'CA', maxlength: 4}, // default CA
  geo     : {type: [Number], index: '2dsphere'},
}

module.exports = new mongoose.Schema(
  VentureSchema,
  schemaOption('_id', 'versionKey')
)
