'use strict'

const {
  Venture,
  Venue
} = require('../models')
const yelp        = require('../libs/yelp')
const algorithm   = require('../libs/algorithm')
const {CATEGORIES} = require('../libs/constants')

function create(req, res, next) {

  const { group, category, date, location } = req.body
  // TODO: check body params

  // search for pertinent venues on yelp
  yelp.search({ date, location, category })
    .then(async (businesses) => {
      // pick options
      const options = await algorithm.pickOptions(businesses)
      // create venues
      const venues = await Venue.batchCreate(options)
      // create venture with venue ids as options
      let venture = new Venture({
        group,
        category: CATEGORIES[category],
        date: date || new Date(),
        options: venues.map(venue => venue._id)
      })

      return venture.save()
    })
    .then(venture => {
      req.data = {...req.data, venture}
      return next()
    })
    .catch(err => next(err))
}

module.exports = { create }
