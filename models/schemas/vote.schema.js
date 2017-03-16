'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const VoteSchema = {
  voter   : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
  venture : {type: mongoose.Schema.Types.ObjectId, ref: 'Venture', required: true, index: true},
  venue   : {type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true, index: true},
  vote    : {type: Boolean, required: true},
}

module.exports = new mongoose.Schema(
  VoteSchema,
  schemaOption('timestamps')
)
