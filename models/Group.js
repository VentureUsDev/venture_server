'use strict'

const mongoose   = require('mongoose')
const Group      = require('./schemas/group.schema')

module.exports = mongoose.model('Group', Group)
