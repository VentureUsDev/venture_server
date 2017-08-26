'use strict'

const mongoose     = require('mongoose')
const schemaOption = require('../../libs/schema_option')
const Location     = require('./location.schema')

const VentureSchema = {
  // may not need an initiator - what previlages would be needed?
  // initiator:    {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
  group:        {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  members:      [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  category:     {type: Number, default: 0, max: 64}, // 0 - food, 1 - drinks
  // TODO: cron job to complete venture (based on date)
  date:         {type: Date}, // not required, if no date, now = createdAt
  options:      [{type: mongoose.Schema.Types.ObjectId, ref: 'Venue'}],
  venue:        {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
  location:     Location,
  radius:       {type: Number, default: 5},
  // will be able to add review when complete
  complete:     {type: Boolean, default: false},
}

module.exports = new mongoose.Schema(
  VentureSchema,
  schemaOption('timestamps')
)

/*
KEY FUNCTIONALITIES

a. get ventures by user - in-vote(without venue key), current, completed
b. get options (list of venues) for a venture
c. post vote
d. upon vote, aggregate votes for venture check for winner
e. send winner venue via sockets
f. if no date, prompt review after certain period of time,
g. if date, prompt review after the date,

*/
