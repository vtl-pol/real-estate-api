const Joi = require('joi')

const { formattedErrors } = require('../../utils/errors')

const { buyerConstants } = require('../buyer')
const { propertyConstants } = require('../property')
const { House } = require('../house')

const sourcesIDs = Object.keys(buyerConstants.SOURCES).map(Number)
const houseRangeTypes = Object.keys(buyerConstants.HOUSE_RANGES).map(Number)
const allowedStatuses = Object.keys(propertyConstants.STATUSES).map(Number)
const allowedMaterials = Object.keys(House.MATERIALS).map(Number)
const allowedBuildingTypes = Object.keys(House.TYPES).map(Number)

const apartmentSchema = Joi.object().keys({
  name: Joi.string().required(),
  buyerStatus: Joi.number().integer().only(...allowedStatuses),
  source: Joi.number().integer().only(...sourcesIDs),
  description: Joi.string(),
  noOfRooms: Joi.number().integer(),
  districtID: Joi.number().integer().allow(null),
  settlement: Joi.string().required(),
  range: Joi.number().only(...houseRangeTypes),
  squareTotal: Joi.number().integer(),
  squareLand: Joi.number().integer(),
  maxPrice: Joi.number().integer(),
  material: Joi.number().integer().only(...allowedMaterials),
  buildingType: Joi.number().integer().only(...allowedBuildingTypes),
  isRenovated: Joi.boolean(),
  hasGarage: Joi.boolean(),
  contract: Joi.string().only(...propertyConstants.CONTRACTS),
  motivation: Joi.string().only(...propertyConstants.MOTIVATIONS),
  reasonToBuy: Joi.string(),
  contactsIDs: Joi.array().min(1).required().items(Joi.number().integer())
})

const filterSchema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string(),
  phone: Joi.string(),
  responsibleID: Joi.array().items(Joi.number().integer()),
  settlement: Joi.array().items(Joi.string()),
  districtID: Joi.array().items(Joi.number().integer()),
  createdAt: Joi.object().keys({
    from: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
    till: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/)
  }),
  maxPrice: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  buyerStatus: Joi.array().items(Joi.number().integer()),
  contract: Joi.array().items(Joi.string().only(...propertyConstants.CONTRACTS).allow(null)),
  motivation: Joi.array().items(Joi.string().only(...propertyConstants.MOTIVATIONS).allow(null)),
  buildingType: Joi.array().items(Joi.number().integer().only(...allowedBuildingTypes)),
  material: Joi.array().items(Joi.number().integer().only(...allowedMaterials)),
  noOfRooms: Joi.array().items(Joi.number().integer()),
  range: Joi.array().items(Joi.number().integer().only(...houseRangeTypes)),
  squareTotal: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  squareLand: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  hasGarage: Joi.boolean(),
  isRenovated: Joi.boolean()
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

const filters = (req, res, next) => {
  Joi.validate(req.query.filter, filterSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

module.exports = { fields, filters }
