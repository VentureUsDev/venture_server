'use strict'

require('dotenv').config()
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
  port: process.env.PORT || 8080,
  APPNAME: process.env.APP_NAME || 'node_server',
  environment: process.env.NODE_ENV,
  jobs: process.env.JOB_TYPES,
  mailer: process.env.GMAIL,
  mailerPw: process.env.GMAIL_PW,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  TWILIO: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    number: process.env.TWILIO_NUM,
  },
  YELP: {
    id: process.env.YELP_CLIENT_ID,
    secret: process.env.YELP_CLIENT_SECRET
  }

}
