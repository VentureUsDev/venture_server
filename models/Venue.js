'use strict'

const mongoose   = require('mongoose')
mongoose.Promise = global.Promise
const Venue    = require('./schemas/venue.schema')

Venue.statics.batchCreate = function (options) {

  return Promise.all(
    options.map(option => {
      const venue = new this
      return venue.createFromOption(option)
    })
  )
}

Venue.methods.createFromOption = function (option) {

  this.name = option.name
  this.yelpId = option.id
  this.phone = option.phone
  this.imageUrl = option.image_url
  this.location = {
    street: option.address1,
    unit: option.address2,
    zip: option.zip_code,
    state: option.state,
    geo: [option.coordinates.longitude, option.coordinates.latitude]
  }
  return this.save()
}

module.exports = mongoose.model('Venue', Venue)
