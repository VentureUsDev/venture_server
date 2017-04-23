'use strict'

const { Group } = require('../models')

function create(req, res, next) {
  const admin = req.user._id
  const { name, members } = req.body
  if (!members || !members.length) return next(new Error('Must specify members'))

  Group.create({ admin, name, members })
    .then(group => {
      req.data = Object.assign({}, req.data, { group })
      next()
    })
    .catch(err => next(err))
}

function get(req, res, next) {
  const user = req.user._id
  Group.find({$or: [
    {admin: user},
    {members: user}
  ]})
    .populate('admin', 'firstName lastName phone')
    .populate('members', 'firstName lastName phone')
    .exec()
    .then(groups => {
      req.data = Object.assign({}, req.data, { groups })
      next()
    })
    .catch(err => next(err))
}

module.exports = { create, get }
