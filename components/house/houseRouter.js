const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const House = require('./house')
const houseResource = require('./houseResource')
const houseDAL = new PropertyDAL('properties', 'house', House)
const houseService = new PropertyService(houseDAL, houseResource)

const passport = require('passport')
require('../auth/authMiddleware')
const houseValidator = require('./houseValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.getProperties(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.getProperty(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), houseValidator.house, houseValidator.uniqe, (req, res) => {
  houseService.createProperty(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), houseValidator.uniqe, (req, res) => {
  houseService.updateProperty(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.deleteProperty(req, res)
})

router.post('/:id/photos', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.uploadPhotos(req, res)
})

module.exports = router
