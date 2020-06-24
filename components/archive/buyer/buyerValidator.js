const Joi = require('joi')
const moment = require('moment')

const { propertyConstants } = require('../../property')
const { buyerConstants } = require('../../buyer')
const { formattedErrors } = require('../../../utils/errors')

const allowedArcReasons = Object.keys(propertyConstants.ARCHIVED_REASONS).map(Number)
const allowedSoldBys = Object.keys(buyerConstants.SOLD_BYS).map(Number)

const archiveSchema = Joi.object().keys({
  archivedReason: Joi.number().integer().required().only(...allowedArcReasons),
  archivedTill: Joi.when('archivedReason', {
    is: Joi.number().integer().only(1, 5).valid(),
    then: Joi.date().raw().required()
  }),
  soldBy: Joi.when('archivedReason', {
    is: Joi.number().integer().only(2, 3).valid(),
    then: Joi.number().integer().only(...allowedSoldBys)
  })
})

const filterSchema = Joi.object().keys({
  archivedReason: Joi.array().items(Joi.number().integer().only(...allowedArcReasons)),
  archivedTill: Joi.object().keys({
    from: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
    till: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/)
  }),
  archivedAt: Joi.object().keys({
    from: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
    till: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/)
  })
}).unknown()

const archive = (req, res, next) => {
  if (req.body.archivedTill) {
    req.body.archivedTill = moment(req.body.archivedTill, 'DD-MM-YYYY').format()
  }

  Joi.validate(req.body, archiveSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

const filters = (req, res, next) => {
  Joi.validate(req.query.filter, filterSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

module.exports = { archive, filters }
