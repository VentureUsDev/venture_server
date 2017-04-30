'use strict'

const mongoose   = require('mongoose')
mongoose.Promise = global.Promise
const Venture    = require('./schemas/venture.schema')

module.exports = mongoose.model('Venture', Venture)
