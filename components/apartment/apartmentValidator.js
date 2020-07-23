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
  contactsIDs: Joi.array().min(1).required().items(Joi.number().integer()),
  reasonToSell: Joi.string()
})

const filtersSchema = Joi.object().keys({
  id: Joi.number().integer(),
  responsibleID: Joi.array().items(Joi.number().integer()),
  phone: Joi.string(),
  settlement: Joi.array().items(Joi.string()),
  districtID: Joi.array().items(Joi.number().integer()),
  street: Joi.array().items(Joi.string()),
  createdAt: Joi.object().keys({
    from: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
    till: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/)
  }),
  price: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  propertyStatus: Joi.array().items(Joi.number().integer()),
  contract: Joi.array().items(Joi.string().only(...propertyConstants.CONTRACTS).allow(null)),
  motivation: Joi.array().items(Joi.string().only(...propertyConstants.MOTIVATIONS).allow(null)),
  buildingType: Joi.array().items(Joi.number().integer()),
  material: Joi.array().items(Joi.number().integer()),
  floor: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  floors: Joi.number().integer(),
  noOfRooms: Joi.array().items(Joi.number().integer()),
  autonomousHeat: Joi.boolean(),
  squareTotal: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  squareLiving: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  squareKitchen: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  renovated: Joi.boolean()
}).unknown()

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
  Joi.validate(req.query.filter, filtersSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}
module.exports = { fields, filters }
