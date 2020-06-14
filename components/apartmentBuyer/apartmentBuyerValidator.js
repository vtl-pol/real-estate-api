const Joi = require('joi')

const { formattedErrors } = require('../../utils/errors')

const { buyerConstants } = require('../buyer')
const { propertyConstants } = require('../property')
const { Apartment } = require('../apartment')

const sourcesIDs = Object.keys(buyerConstants.SOURCES).map(Number)
const aptFloorTypes = Object.keys(buyerConstants.APT_FLOORS).map(Number)
const allowedStatuses = Object.keys(propertyConstants.STATUSES).map(Number)
const allowedMaterials = Object.keys(Apartment.MATERIALS).map(Number)
const allowedBuildingTypes = Object.keys(Apartment.TYPES).map(Number)

const apartmentSchema = Joi.object().keys({
  name: Joi.string().required(),
  buyerStatus: Joi.number().integer().only(...allowedStatuses),
  source: Joi.number().integer().only(...sourcesIDs),
  description: Joi.string(),
  noOfRooms: Joi.number().integer(),
  districtID: Joi.number().integer(),
  maxPrice: Joi.number().integer(),
  material: Joi.number().integer().only(...allowedMaterials),
  buildingType: Joi.number().integer().only(...allowedBuildingTypes),
  floor: Joi.number().integer().only(...aptFloorTypes),
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
