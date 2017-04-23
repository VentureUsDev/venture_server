'use strict'

const { Friend } = require('../models')

function create(req, res, next) {
  const owner = req.user._id
  const friend = req.body.user
  const { nickname } = req.body

  Friend.findOne({ owner, friend }).exec()
    .then(doc => {
      if (doc) throw new Error('Already befriended')
      let friend = { owner, friend }
      if (nickname) friend.nickname = nickname
      return Friend.create(friend)
    })
    .then(friend => {
      req.data = Object.assign({}, req.data, { friend })
      next()
    })
    .catch(err => next(err))
}

function get(req, res, next) {
  const owner = req.user._id
  Friend.find({ owner })
    .select('friend nickname')
    .populate('friend', 'firstName lastName phone')
    .exec()
    .then(friends => {
      req.data = Object.assign({}, req.data, { friends })
      next()
    })
    .catch(err => next(err))
}

module.exports = { create, get }
