'use strict'

const { User }      = require('../models')
const { signToken } = require('../libs/authentication')
const { validate }  = require('../libs/helpers')
const updateProps   = require('../libs/update_helper')
const worker        = require('../worker')

function create(req, res, next) {
  const { phone } = req.body
  if (!phone) throw new Error('Phone is required')
  User.findByPhone(phone)

    .then(user => {

      // if a verified user exist,
      if (user && user.verified) {
        // a. throw error if coming from signup
        if (req.url != '/friend') throw new Error('User already exists')
        // b. go to next if coming from friend (param.friend) attach user id to req
        req.body.user = user._id
        next()
      }

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
      req.body.user = user._id
      next()
      const type = req.url != '/friend' ? 'signup' : 'befriend'
      // run a background job to send text with code
      worker.now('send_verification', {
        phone: user.phone,
        code: user.code,
        type,
      })
    })

    .catch(err => next(err))
}

function update(req, res, next) {
  const { _id } = req.user
  User.findById(_id).exec()

    .then(user => updateProps.call(user, req.body))

    .then(user => {
      const response = user ? {user: user.toObject()} : `Verification code sent to user`
      req.data = Object.assign({}, req.data, response)
      return next()
    })

    .catch(err => next(err))
}

module.exports = { create, update }
