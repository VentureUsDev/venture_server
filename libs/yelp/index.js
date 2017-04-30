'use strict'

const yelp      = require('yelp-fusion')
const { YELP }  = require('../../config')
let CLIENT

/* gets yelp token and initializes yelp client */
function initialize() {
  return yelp.accessToken(YELP.id, YELP.secret)
    .then(res => {
      const token = res.jsonBody.access_token
      CLIENT = yelp.client(token)
      return token
    })
    .catch(err => { throw err })
}

function search(params) {
  if (!CLIENT) throw new Error('Yelp client not initialized')
  return CLIENT.search(params)
    .then(res => res.jsonBody.businesses)
    .catch(err => { throw err })
}

module.exports { initialize, search }
