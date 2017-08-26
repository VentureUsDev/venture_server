'use strict'

const yelp      = require('yelp-fusion')
const { YELP }  = require('../../config')
const CONFIG = {
  radius: 16000,
  sort_by: 'rating',
}

let CLIENT

/* gets yelp token and initializes yelp client */
function initialize () {

  console.log('Initializing Yelp Client')

  return yelp.accessToken(YELP.id, YELP.secret)
    .then(res => {
      const token = res.jsonBody.access_token
      CLIENT = yelp.client(token)
      return CLIENT
    })
    .catch(err => { throw err })
}

async function search (params) {

  if (!CLIENT) {
    CLIENT = await initialize()
  }

  return CLIENT.search(formatSearchParam(params))
    .then(res => res.jsonBody.businesses)
    .catch(err => { throw err })
}

module.exports = { initialize, search }

function formatSearchParam (params) {

  const {
    category,
    date,
    location: { zip, latitude, longitude },
  } = params

  return {
    ...CONFIG,
    open_at: toUnixDate(date),
    categories: category,
    location: zip,
    latitude,
    longitude,
  }
}

function toUnixDate (dateString) {

  const date = dateString || new Date()
  return Date.parse(date)/1000
}
