const Joi = require('joi')

const { propertyConstants } = require('../property')
const { formattedErrors } = require('../../utils/errors')

const allowedSources = Object.keys(propertyConstants.SOURCES).map(Number)

const apartmentSchema = Joi.object().keys({
  title: Joi.string().required(),
  noOfRooms: Joi.number().integer().required().min(1).max(5),
  settlement: Joi.string().required(),
  districtID: Joi.number().integer().allow(null),
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
  source: Joi.number().integer().only(allowedSources).allow(null),
  featuredPhotoNo: Joi.number().integer().min(0),
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
