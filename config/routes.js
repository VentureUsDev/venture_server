const express = require('express')
const {
  checkToken,
  authenticate,
  verify,
  forgot
}             = require('../libs/authentication')
const router  = express.Router()
const {
  handleSuccess,
  handleError
}             = require('../libs/response')
const users   = require('../controllers/users')
const friends = require('../controllers/friends')

module.exports = () => {

  /*
  AUTH MIDDLEWARE
  */
  router.use(checkToken)

  /*
  AUTH ROUTES
  */
  router.post('/authenticate', authenticate)
  router.post('/verify', verify)
  router.get('/forgot-password', forgot)

  /*
  TEST ROUTE
  */
  router.get('/test', (req, res) => res.json('API ALIVE'))

  /*
  PRIMARY ROUTES
  */
  router.route('/user')
    .post(users.create)
    .put(users.update)

  router.post('/friend', users.create, friends.create)

  /*
  SUCCESS & ERROR HANDLER
  */
  router.use(handleSuccess)
  router.use(handleError)

  return router

}
