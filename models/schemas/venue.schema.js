'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')
const Location     = require('./location.schema')

const VenueSchema = {
  name     : {type: String, required: true, maxlength: 128},
  yelpId   : {type: String, maxlength: 64},
  phone    : {type: String, maxlength: 16},
  imageUrl : {type: String, maxlength: 128},
  location : Location,
}

module.exports = new mongoose.Schema(
  VenueSchema,
  schemaOption()
)
