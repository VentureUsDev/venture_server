'use strict'
const { User }      = require('../models')
const { signToken } = require('../libs/authentication')
const { validate }  = require('../libs/helpers')
const updateProps   = require('../libs/update_helper')
const worker        = require('../worker')

function create(req, res, next) {
  const { phone } = req.body

  User.findByPhone(phone)

    .then(user => {
      // if a verified user exist, throw error
      if (user && user.verified) throw new Error('User already exists')
      // if no user, create new
      if (!user) {
        validate(phone, 'phone')
        user = new User({ phone })
      }
      // generate new user.code
      return user.generateOTP()
    })

    .then(user => {
      req.data = {prompt: 'Verification code sent to user'}
      next()
      // run a background job to send text with code
      worker.now('text_verification', {
        phone: user.phone,
        code: user.code,
      })
    })

    .catch(err => next(err))
}

function update(req, res, next) {
  const { _id } = req.user

  User.findById(_id).exec()

    .then(user => updateProps.call(user, req.body))

    .then(user => {
      const response = user ? {token: signToken(user, 30)} : `Verification code sent to user`
      req.data = Object.assign({}, req.data, response)
      return next()
    })

    .catch(err => next(err))
}

module.exports = { create, update }
