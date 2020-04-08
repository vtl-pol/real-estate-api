const Joi = require('joi')
const moment = require('moment')

const { propertyConstants } = require('../property')

const apartmentSchema = Joi.object().keys({
  title: Joi.string().required(),
  noOfRooms: Joi.number().integer().required().min(1).max(5),
  districtId: Joi.number().integer().required(),
  street: Joi.string().required(),
  houseNo: Joi.string().max(4).required(),
  aptNo: Joi.number().integer(),
  floor: Joi.number().integer(),
  autonomousHeat: Joi.boolean().required(),
  price: Joi.number().integer().max(9999999).required(),
  material: Joi.number().integer().required(),
  floors: Joi.number().integer().min(1).max(28).required(),
  buildingType: Joi.number().integer().required(),
  squareTotal: Joi.number().integer().max(999).required(),
  squareLiving: Joi.number().integer().max(999).required(),
  squareKitchen: Joi.number().integer().max(99).required(),
  renovated: Joi.boolean().required(),
  description: Joi.string().required(),
  contract: Joi.string().only(...propertyConstants.CONTRACTS).allow(null),
  motivation: Joi.string().only(...propertyConstants.MOTIVATIONS).allow(null),
  source: Joi.number().integer().min(1).max(Object.keys(propertyConstants.SOURCES).length - 1).allow(null),
  ownerName: Joi.string().required(),
  ownerPhone: Joi.string().required(),
  ownerBirthday: Joi.date().raw()
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
  if (req.body.ownerBirthday) {
    req.body.ownerBirthday = moment(req.body.ownerBirthday, 'DD-MM-YYYY').format()
    console.log(req.body.ownerBirthday)
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
