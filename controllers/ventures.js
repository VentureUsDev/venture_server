'use strict'

const { Venture } = require('../models')
const yelp        = require('../libs/yelp')

function create(req, res, next) {

  const { group, category, date, location } = req.body
  // search for pertinent venues on yelp
  yelp.search({ date, location, category})
    .then(result => {
      req.data = { result }
      next()
    })
    .catch(err => next(err))
  // pick options
  // create venues
  // create venture with venue ids as options
  // return success message
}

module.exports = { create }
