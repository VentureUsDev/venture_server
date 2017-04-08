'use strict'
require('dotenv').config()

const environment = process.env.NODE_ENV
const port        = process.env.PORT || 8080
const APPNAME     = process.env.APP_NAME || 'node_server'
const jobs        = process.env.JOB_TYPES
const mailer      = process.env.GMAIL
const mailerPw    = process.env.GMAIL_PW
const JWT_SECRET  = process.env.JWT_SECRET
const CLIENT_URL  = process.env.CLIENT_URL
const TWILIO = {
  sid: process.env.TWILIO_ACCOUNT_SID,
  token: process.env.TWILIO_AUTH_TOKEN,
  number: process.env.TWILIO_NUM,
}

let log, db

switch(environment) {
  case 'production':
    log = '[:date[iso]] :remote-addr - :remote-user :method :url HTTP/:http-version STATUS/:status :res[content-length] :referrer :user-agent'
    db = process.env.MONGODB_URI
    break
  case 'development':
    log = 'dev'
    db = process.env.MONGODB_URI
    break
  default: //local
    log = 'dev'
    db = `mongodb://localhost/${APPNAME}`
}

module.exports = {
  db,
  log,
  port,
  APPNAME,
  environment,
  jobs,
  mailer,
  mailerPw,
  JWT_SECRET,
  CLIENT_URL,
  TWILIO,
}
