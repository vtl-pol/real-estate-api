const Joi = require('joi')
const houseDAL = require('./houseDAL')

const houseSchema = Joi.object().keys({
  title: Joi.string().required(),
  noOfRooms: Joi.number().integer().required().min(1).max(5),
  districtId: Joi.number().integer().required(),
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
  description: Joi.string().required()
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

const house = (req, res, next) => {
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

  const exists = await houseDAL.houseExists(params, id)

  if (exists) {
    return res.status(422).send({ success: false, error: 'Такий Кадастровий номер вже є в базі' })
  }
  return next()
}
module.exports = { house, uniqe }
