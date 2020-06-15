const Joi = require('joi')

const { formattedErrors } = require('../../utils/errors')

const PropertyDAL = require('../property/propertyDAL')
const commerceDAL = new PropertyDAL('properties', 'commerce')
const { propertyConstants } = require('../property')

const commerceSchema = Joi.object().keys({
  title: Joi.string().required(),
  noOfRooms: Joi.number().integer().required().min(1).max(5),
  districtID: Joi.number().integer().required(),
  settlement: Joi.string().required(),
  street: Joi.string().required(),
  houseNo: Joi.string().max(4).required(),
  price: Joi.number().integer().max(9999999).required(),
  floor: Joi.number().integer().required(),
  floors: Joi.number().integer().min(1).max(5).required(),
  buildingType: Joi.number().integer().min(0).max(5).required(),
  squareTotal: Joi.number().integer().max(999).required(),
  squareLiving: Joi.number().integer().max(999).required(),
  renovated: Joi.boolean().required(),
  autonomousHeat: Joi.boolean().required(),
  description: Joi.string().required(),
  contract: Joi.string().only(...propertyConstants.CONTRACTS).allow(null),
  motivation: Joi.string().only(...propertyConstants.MOTIVATIONS).allow(null),
  source: Joi.number().integer().min(1).max(Object.keys(propertyConstants.SOURCES).length - 1).allow(null),
  featuredPhotoNo: Joi.number().integer().min(0),
  contactsIDs: Joi.array().min(1).required().items(Joi.number().integer())
})

const fields = (req, res, next) => {
  Joi.validate(req.body, commerceSchema, function (err, _value) {
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

  const exists = await commerceDAL.propertyExists(params, id)

  if (exists) {
    return res.status(422).send({ success: false, error: 'Такий Кадастровий номер вже є в базі' })
  }
  return next()
}
module.exports = { fields, uniqe }
