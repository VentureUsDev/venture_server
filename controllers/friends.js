'use strict'

const { Friend } = require('../models')

function create(req, res, next) {
  const owner = req.user._id
  const friend = req.body.user

  Friend.findOne({ owner, friend }).exec()
    .then(doc => {
      if (doc) throw new Error('Already befriended')
      return Friend.create({ owner, friend })
    })
    .then(friend => {
      req.data = Object.assign({}, req.data, { friend })
      next()
    })
    .catch(err => next(err))
}

module.exports = { create }
