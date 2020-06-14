const Joi = require('joi')

const { formattedErrors } = require('../../utils/errors')

const { buyerConstants } = require('../buyer')
const { propertyConstants } = require('../property')
const { Commerce } = require('../commerce')

const sourcesIDs = Object.keys(buyerConstants.SOURCES).map(Number)
const allowedStatuses = Object.keys(propertyConstants.STATUSES).map(Number)
const allowedBuildingTypes = Object.keys(Commerce.BUILDING_TYPES).map(Number)

const apartmentSchema = Joi.object().keys({
  name: Joi.string().required(),
  buyerStatus: Joi.number().integer().only(...allowedStatuses),
  source: Joi.number().integer().only(...sourcesIDs),
  description: Joi.string(),
  noOfRooms: Joi.number().integer().max(6),
  districtID: Joi.number().integer(),
  squareTotal: Joi.number().integer(),
  maxPrice: Joi.number().integer(),
  buildingType: Joi.number().integer().only(...allowedBuildingTypes),
  isRenovated: Joi.boolean(),
  autonomousHeat: Joi.boolean(),
  contract: Joi.string().only(...propertyConstants.CONTRACTS),
  motivation: Joi.string().only(...propertyConstants.MOTIVATIONS),
  reasonToBuy: Joi.string(),
  contactsIDs: Joi.array().min(1).required().items(Joi.number().integer())
})

const fields = (req, res, next) => {
  Joi.validate(req.body, apartmentSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

module.exports = { fields }
