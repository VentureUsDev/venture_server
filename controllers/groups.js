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

module.exports = { create }
