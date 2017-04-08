'use strict'
const { sendText } = require('../twilio')
const { APPNAME } = require('../../config')

module.exports = (agenda) => {

  agenda.define('send_verification', (job, done) => {
    const config = job.attrs.data
    config.message = `Your verification code for ${APPNAME}: `

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
