'use strict'
const { User }       = require('../models')
const jwt            = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const worker         = require('../worker')

function checkToken(req, res, next) {
  const url = req._parsedUrl.pathname
  const checker = `${req.method}${url}`

  switch(checker) {

    // No auth check routes
    case 'GET/test':
    case 'PUT/verify':
    case 'PUT/authenticate':
    case 'PUT/forgot-password':
    case 'POST/user':
      return next()

    // auth check
    default:
      const token = req.headers['x-access-token']

      if (!token) return next(new Error('Missing token'))

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Invalid token'))
        req.user = decoded
        return next()
      })
  }

}

function signToken(user, expiresIn = null) {
  const { _id, phone, verified, firstName, lastName } = user
  user = Object.assign({}, { _id, phone, verified, firstName, lastName })

  if(expiresIn) {
    expiresIn = 3600 * expiresIn
    return jwt.sign(user, JWT_SECRET, { expiresIn })
  }
  return jwt.sign(user, JWT_SECRET)
}

function verify(req, res, next) {
  const { code, phone } = req.body
  if(!code || !phone) throw new Error('Phone & code required')

  User.findByPhone(phone)
    .then(user => {
      if (!user) throw new Error('Wrong phone')

      if (user.code != code) throw new Error('Invalid verification code')

      user.verified = true
      user.code = null
      return user.save()
    })

    .then(user => {
      req.data = {token: signToken(user)}
      return next()
    })

    .catch(err => next(err))
}

function authenticate(req, res, next) {
  const { phone, password } = req.body
  if (!phone || !password) throw new Error('Phone & password required')
  User.findByPhone(phone)
    .then(user => {

      if (!user || !user.verified) {
        throw new Error('No such verified user')

      } else if(!user.validPassword(password)) {
        throw new Error('Wrong password')

      } else {
        req.data = {token: signToken(user)}
      }

      return next()
    })
    .catch(err => next(err))
}

function forgot(req, res, next) {
  const { phone } = req.body
  if (!phone) throw new Error('Phone is required')
  User.findByPhone(phone)
    .then(user => user.generateOTP())
    .then(user => {
      worker.now('send_verification', {
        phone: user.phone,
        code: user.code,
      })
      req.data = `Verification code sent to ${user.phone}`
      return next()
    })
    .catch(err => next(new Error('Problem in generating verification code')))
}


module.exports = {
  checkToken,
  signToken,
  verify,
  authenticate,
  forgot
}
