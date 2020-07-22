const Joi = require('joi')
const phoneFormatter = require('phone-formatter')

const { formattedErrors } = require('../../utils/errors')

const userDAL = require('./userDAL')
const User = require('./user')

const userSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  rank: Joi.number().integer().only(...Object.values(User.RANKS).map(r => r.key)),
  role: Joi.number().integer().only(...Object.values(User.ROLES).map(r => r.key)),
  isOnContract: Joi.boolean().required(),
  isOfficial: Joi.boolean().required(),
  phone: Joi.string().required(),
  email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
  password: Joi.string().min(6)
})

const profileSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
  password: Joi.string().min(6),
  passwordConfirmation: Joi.when('password', {
    is: Joi.only([null, 0]),
    otherwise: Joi.string().valid(Joi.ref('password')).required()
  })
})

const fields = (req, res, next) => {
  if (req.body.phone) {
    req.body.phone = phoneFormatter.normalize(req.body.phone)
  }

  Joi.validate(req.body, userSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

const profile = (req, res, next) => {
  req.params.id = req.user.id

  if (req.body.phone) {
    req.body.phone = phoneFormatter.normalize(req.body.phone)
  }

  Joi.validate(req.body, profileSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

const uniqe = async (req, res, next) => {
  if (req.body.email) {
    const byEmail = await userDAL.checkExists({ email: req.body.email }, (req.params.id || null))
    console.log(byEmail)
    if (byEmail) {
      return res.status(422).send({ success: false, error: 'Такий Email вже є в базі' })
    }
  }
  if (req.body.phone) {
    const byPhone = await userDAL.checkExists({ phone: req.body.phone }, (req.params.id || null))
    if (byPhone) {
      return res.status(422).send({ success: false, error: 'Такий телефон вже є в базі' })
    }
  }
  return next()
}

module.exports = { fields, uniqe, profile }
