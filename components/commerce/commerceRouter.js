const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const Commerce = require('./commerce')
const commerceResource = require('./commerceResource')
const commerceDAL = new PropertyDAL('properties', 'commerce', Commerce)
const commerceService = new PropertyService(commerceDAL, commerceResource)

const { authMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')
const commerceValidator = require('./commerceValidator')
const propertyValidator = require('../archive/property/propertyValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', authMiddleware, commerceValidator.filters, (req, res) => {
  commerceService.getProperties(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  commerceService.getProperty(req, res)
})

router.post('/', authMiddleware, notGuestMiddleware, commerceValidator.fields, commerceValidator.uniqe, contactValidator.exists, (req, res) => {
  commerceService.createProperty(req, res)
})

router.put('/:id', authMiddleware, commerceValidator.uniqe, contactValidator.exists, (req, res) => {
  commerceService.updateProperty(req, res)
})

router.delete('/:id/archive', authMiddleware, propertyValidator.archive, (req, res) => {
  commerceService.archiveProperty(req, res)
})

router.post('/:id/photos', authMiddleware, (req, res) => {
  commerceService.uploadPhotos(req, res)
})

router.delete('/:propertyID/photos/:id', authMiddleware, (req, res) => {
  commerceService.deletePhoto(req, res)
})

router.patch('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  commerceService.saveToFavorites(req, res)
})

router.delete('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  commerceService.removeFromFavorites(req, res)
})

module.exports = router
