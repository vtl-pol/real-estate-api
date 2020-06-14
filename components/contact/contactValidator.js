const Joi = require('joi')
const moment = require('moment')
const phoneFormatter = require('phone-formatter')

const contactDAL = new (require('./contactDAL'))('contacts')
const { formattedErrors } = require('../../utils/errors')

const contactSchema = Joi.object().keys({
  id: Joi.number().integer().allow(null).optional(),
  name: Joi.when('id', {
    is: Joi.only([null, 0]),
    then: Joi.string().required()
  }),
  birthday: Joi.when('id', {
    is: Joi.only([null, 0]),
    then: Joi.date().raw().required()
  }),
  phones: Joi.array().items(Joi.object().keys({
    id: Joi.number().integer().allow(null).optional(),
    phone: Joi.when('id', {
      is: Joi.only([null, 0]),
      then: Joi.string().required()
    }),
    isOnFacebook: Joi.when('id', {
      is: Joi.only([null, 0]),
      then: Joi.boolean().default(false),
      otherwise: Joi.boolean()
    }),
    isOnTelegram: Joi.when('id', {
      is: Joi.only([null, 0]),
      then: Joi.boolean().default(false),
      otherwise: Joi.boolean()
    }),
    isOnViber: Joi.when('id', {
      is: Joi.only([null, 0]),
      then: Joi.boolean().default(false),
      otherwise: Joi.boolean()
    }),
    isOnWhatsapp: Joi.when('id', {
      is: Joi.only([null, 0]),
      then: Joi.boolean().default(false),
      otherwise: Joi.boolean()
    })
  }))
})

const fields = (req, res, next) => {
  req.body.id = req.params.id
  if (req.body.birthday) {
    req.body.birthday = moment(req.body.birthday, 'DD-MM-YYYY').format()
  }
  req.body.phones = req.body.phones.map(ph => {
    if (ph.phone) {
      const phone = phoneFormatter.normalize(ph.phone)
      ph.phone = phone
    }
    return ph
  })

  Joi.validate(req.body, contactSchema, function (err, _value) {
    if (err) {
      const errors = formattedErrors(err.details)
      return res.status(422).json({ errors })
    }
    return next()
  })
}

const exists = async (req, res, next) => {
  if (!req.body.contactsIDs || req.body.contactsIDs.length === 0) {
    return next()
  }
  const exists = await contactDAL.exist(req.body.contactsIDs)
  if (!exists) {
    const errors = {
      contactsIDs: 'Один, або кілька контактів не знайдено в базі.'
    }
    return res.status(422).json({ errors })
  }
  return next()
}

module.exports = { fields, exists }
