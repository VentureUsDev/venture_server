'use strict'
const { TWILIO } = require('../../config')
const twilio     = require('twilio')(TWILIO.sid, TWILIO.token)
const sender     = TWILIO.number

const sendText = (config) => {
  const { phone, code, message } = config
  const body = code ? `${message}${code}` : message

  return twilio.messages.create({
    to: `${phone}`,
    from: `${sender}`,
    body: body
  })
}

const batchSendText = (users, message) => {
  return Promise.all(users.map(user => {
    const config = {phone: user.phone, message }
    return sendText(config)
  }))
}

module.exports = { sendText, batchSendText }
