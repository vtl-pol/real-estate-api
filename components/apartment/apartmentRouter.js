const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const Apartment = require('./apartment')
const apartmentResource = require('./apartmentResource')
const apartmentDAL = new PropertyDAL('properties', 'apartment', Apartment)
const apartmentService = new PropertyService(apartmentDAL, apartmentResource)

const { authMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')
const apartmentValidator = require('./apartmentValidator')
const propertyValidator = require('../archive/property/propertyValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', authMiddleware, apartmentValidator.filters, (req, res) => {
  apartmentService.getProperties(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  apartmentService.getProperty(req, res)
})

router.post('/', authMiddleware, notGuestMiddleware, apartmentValidator.fields, contactValidator.exists, (req, res) => {
  apartmentService.createProperty(req, res)
})

router.put('/:id', authMiddleware, contactValidator.exists, (req, res) => {
  apartmentService.updateProperty(req, res)
})

router.delete('/:id/archive', authMiddleware, propertyValidator.archive, (req, res) => {
  apartmentService.archiveProperty(req, res)
})

router.post('/:id/photos', authMiddleware, (req, res) => {
  apartmentService.uploadPhotos(req, res)
})

router.delete('/:propertyID/photos/:id', authMiddleware, (req, res) => {
  apartmentService.deletePhoto(req, res)
})

module.exports = router
