const mongoose   = require('mongoose')
mongoose.Promise = global.Promise
const Friend     = require('./schemas/friend.schema')

module.exports = mongoose.model('Friend', Friend)
