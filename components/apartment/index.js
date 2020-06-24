const apartmentRouter = require('./apartmentRouter')
const apartmentResource = require('./apartmentResource')
const apartmentValidator = require('./apartmentValidator')
const Apartment = require('./apartment')

module.exports = { Apartment, apartmentRouter, apartmentResource, apartmentValidator }
