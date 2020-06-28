const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const House = require('./house')
const houseResource = require('./houseResource')
const houseDAL = new PropertyDAL('properties', 'house', House)
const houseService = new PropertyService(houseDAL, houseResource)

const { authMiddleware, softAuthMiddleware } = require('../auth/authMiddleware')
const houseValidator = require('./houseValidator')
const propertyValidator = require('../archive/property/propertyValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', softAuthMiddleware, houseValidator.filters, (req, res) => {
  houseService.getProperties(req, res)
})

router.get('/:id', softAuthMiddleware, (req, res) => {
  houseService.getProperty(req, res)
})

router.post('/', authMiddleware, houseValidator.fields, houseValidator.uniqe, contactValidator.exists, (req, res) => {
  houseService.createProperty(req, res)
})

router.put('/:id', authMiddleware, houseValidator.uniqe, contactValidator.exists, (req, res) => {
  houseService.updateProperty(req, res)
})

router.delete('/:id/archive', authMiddleware, propertyValidator.archive, (req, res) => {
  houseService.archiveProperty(req, res)
})

router.post('/:id/photos', authMiddleware, (req, res) => {
  houseService.uploadPhotos(req, res)
})

router.delete('/:propertyID/photos/:id', authMiddleware, (req, res) => {
  houseService.deletePhoto(req, res)
})

module.exports = router
