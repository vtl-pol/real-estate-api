const Joi = require('joi')
const moment = require('moment')

const { buyerConstants } = require('../buyer')
const { propertyConstants } = require('../property')
const { Apartment } = require('../apartment')

const sourcesIDs = Object.keys(buyerConstants.SOURCES).map(k => Number(k))
const aptFloorTypes = Object.keys(buyerConstants.APT_FLOORS).map(k => Number(k))
const allowedStatuses = Object.values(propertyConstants.STATUSES)
const allowedMaterials = Object.values(Apartment.MATERIALS)
const allowedBuildingTypes = Object.values(Apartment.TYPES)

const apartmentSchema = Joi.object().keys({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  birthday: Joi.date().raw(),
  isOnViber: Joi.boolean(),
  isOnTelegram: Joi.boolean(),
  isOnFacebook: Joi.boolean(),
  isOnWhatsapp: Joi.boolean(),
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
  reasonToBuy: Joi.string()
})

const formattedErrors = (errs) => {
  const result = {}
  errs.map(err => {
    console.log(err)
    switch (err.type) {
      case 'any.required':
        result[err.context.key] = 'Поле обов\'язкове'
        break
      case 'any.empty':
        result[err.context.key] = 'Поле обов\'язкове'
        break
      case 'string.min':
        result[err.context.key] = `Мінімально ${err.context.limit} символів`
        break
      case 'string.max':
        result[err.context.key] = `Максимально ${err.context.limit} символів`
        break
      default:
        result[err.context.key] = 'Не вірне значення'
        break
    }
  })
  return result
}

const fields = (req, res, next) => {
  if (req.body.birthday) {
    req.body.birthday = moment(req.body.birthday, 'DD-MM-YYYY').format()
    console.log(req.body.birthday)
  }

  Joi.validate(req.body, apartmentSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

module.exports = { fields }
