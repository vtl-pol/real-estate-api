const Joi = require('joi')

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).with('email', 'password')

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

const login = (req, res, next) => {
  Joi.validate(req.body, loginSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

module.exports = { login }
