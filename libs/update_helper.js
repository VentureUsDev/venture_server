'use strict'

const { validate } = require('./helpers')
const worker       = require('../worker')

module.exports = function(updates) {

  for (var i in updates) {

    switch (i) {

    /* Ignored Cases */
    case 'code':
    case '_id':
    case 'verified':
      break

    /* User Update Cases */
    case 'email':
      validate(updates[i], i)
      this[i] = updates[i]
      this.verified = false
      return this.generateOTP()
        .then(user => {
          // generate a verification code for user
          worker.now('email_verification', {
            email: user.email,
            code: user.code,
          })
        })
        .catch(err => {throw err})

    case 'password':
      this[i] = this.generateHash(updates[i])
      break

    case 'firstName':
      this[i] = updates[i].toLowerCase()
      break

    case 'lastName':
      this[i] = updates[i].toLowerCase()
      break

    case 'phone':
      validate(updates[i], i)
      this[i] = updates[i]
      break

    default:
      this[i] = updates[i]

    }
  }

  return this.save()

}
