'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')

const ReviewSchema = {
  reviewer : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  venture  : {type: mongoose.Schema.Types.ObjectId, ref: 'Venture', required: true},
  venue    : {type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true},
  rating   : {type: Number, default: 0, max: 5},
  review   : {type: String, minlength: 2, maxlength: 128},
}

module.exports = new mongoose.Schema(
  ReviewSchema,
  schemaOption('timestamps')
)
