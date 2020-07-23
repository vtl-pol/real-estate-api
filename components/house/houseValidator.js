const Joi = require('joi')

const { formattedErrors } = require('../../utils/errors')

const PropertyDAL = require('../property/propertyDAL')
const houseDAL = new PropertyDAL('properties', 'house')
const { propertyConstants } = require('../property')

const houseSchema = Joi.object().keys({
  title: Joi.string().required(),
  noOfRooms: Joi.number().integer().required().min(1).max(5),
  districtID: Joi.number().integer().allow(null),
  settlement: Joi.string().required(),
  street: Joi.string().required(),
  houseNo: Joi.string().max(4).required(),
  price: Joi.number().integer().max(9999999).required(),
  material: Joi.number().integer().required(),
  floors: Joi.number().integer().min(1).max(4).required(),
  buildingType: Joi.number().integer().required(),
  squareTotal: Joi.number().integer().max(999).required(),
  squareLiving: Joi.number().integer().max(999).required(),
  squareKitchen: Joi.number().integer().max(99).required(),
  squareLand: Joi.number().integer().required(),
  registrationNo: Joi.string().regex(/^\d{10}:\d{2}:\d{3}:\d{4}$/).required(), // 0000000000:00:000:0001
  renovated: Joi.boolean().required(),
  garage: Joi.boolean().required(),
  builtAt: Joi.string().regex(/^\d{4} Q\d{1}$/).required(), // 2019 Q2
  description: Joi.string().required(),
  contract: Joi.string().only(...propertyConstants.CONTRACTS),
  motivation: Joi.string().only(...propertyConstants.MOTIVATIONS),
  source: Joi.number().integer().min(1).max(Object.keys(propertyConstants.SOURCES).length - 1).allow(null),
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
  squareLand: Joi.object().keys({
    from: Joi.number().integer(),
    till: Joi.number().integer()
  }),
  garage: Joi.boolean(),
  renovated: Joi.boolean()
}).unknown()

const fields = (req, res, next) => {
  Joi.validate(req.body, houseSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

const uniqe = async (req, res, next) => {
  if (!req.body.registrationNo) {
    return next()
  }
  const params = { registrationNo: req.body.registrationNo }
  const id = req.params.id

  const exists = await houseDAL.propertyExists(params, id)

  if (exists) {
    return res.status(422).send({ success: false, error: 'Такий Кадастровий номер вже є в базі' })
  }
  return next()
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

module.exports = { fields, uniqe, filters }
