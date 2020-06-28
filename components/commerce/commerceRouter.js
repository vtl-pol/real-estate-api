const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const Commerce = require('./commerce')
const commerceResource = require('./commerceResource')
const commerceDAL = new PropertyDAL('properties', 'commerce', Commerce)
const commerceService = new PropertyService(commerceDAL, commerceResource)

const { authMiddleware, softAuthMiddleware } = require('../auth/authMiddleware')
const commerceValidator = require('./commerceValidator')
const propertyValidator = require('../archive/property/propertyValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', softAuthMiddleware, commerceValidator.filters, (req, res) => {
  commerceService.getProperties(req, res)
})

router.get('/:id', softAuthMiddleware, (req, res) => {
  commerceService.getProperty(req, res)
})

router.post('/', authMiddleware, commerceValidator.fields, commerceValidator.uniqe, contactValidator.exists, (req, res) => {
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

module.exports = router
