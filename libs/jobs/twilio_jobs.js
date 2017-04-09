'use strict'
const { sendText } = require('../twilio')
const { APPNAME } = require('../../config')

module.exports = (agenda) => {

  agenda.define('send_verification', (job, done) => {
    const config = job.attrs.data
    config.message = configureMessage(config.type)

    sendText(config)
      .then(data => {
        console.log(`JOB ID ${job.attrs._id}: SUCCESS`)
        console.log(`SENT VERIFICATION TO PHONE ${config.phone}`)
        done()
      })
      .catch(err => {
        console.log(`JOB ID ${job.attrs._id}: FAILED`)
        console.log(`ERROR CODE: ${err.code}`)
        done(err.message)
      })
  })

}

function configureMessage(type) {
  switch (type) {

    case 'befriend':
      return `Your friend has invited you to ${APPNAME}. Use this code to signup: `

    case 'signup':
    default:
      return `Your verification code for ${APPNAME}: `
  }

}
