const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const Apartment = require('./apartment')
const apartmentResource = require('./apartmentResource')
const apartmentDAL = new PropertyDAL('properties', 'apartment', Apartment)
const apartmentService = new PropertyService(apartmentDAL, apartmentResource)

const passport = require('passport')
require('../auth/authMiddleware')
const apartmentValidator = require('./apartmentValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.getProperties(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.getProperty(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), apartmentValidator.fields, (req, res) => {
  apartmentService.createProperty(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.updateProperty(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.deleteProperty(req, res)
})

router.post('/:id/photos', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.uploadPhotos(req, res)
})

router.delete('/:propertyID/photos/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.deletePhoto(req, res)
})

module.exports = router
