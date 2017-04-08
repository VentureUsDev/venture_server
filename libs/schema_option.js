'use strict'

module.exports = (...args) => {

  const options = {}

  args.forEach(i => {

    switch(i) {

    case '_id':
      options[i] = false
      break

    case 'timestamps':
      options[i] = true
      break

    case 'versionKey':
      options[i] = false
      break

    case 'toJSON':
    case 'toObject':
      options[i] = {
        virtuals: true,
        transform: function(doc, ret, options) {
          if (ret.password) delete ret.password
          if (ret.code) delete ret.code
          delete ret.id
          delete ret.__v
      }}
      break

    case 'transform':
      options.toObject = {
        transform: function(doc, ret, options) {
          delete ret.code
          delete ret.password
          delete ret.__v
        }
      }
      break

    }

  })

  return options

}
