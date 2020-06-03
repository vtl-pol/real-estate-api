const Joi = require('joi')
const { formattedErrors } = require('../../utils/errors')

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).with('email', 'password')

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
