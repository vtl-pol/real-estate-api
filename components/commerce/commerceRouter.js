const express = require('express')
const router = express.Router()

const PropertyDAL = require('../property/propertyDAL')
const PropertyService = require('../property/propertyService')

const Commerce = require('./commerce')
const commerceResource = require('./commerceResource')
const commerceDAL = new PropertyDAL('properties', 'commerce', Commerce)
const commerceService = new PropertyService(commerceDAL, commerceResource)

const passport = require('passport')
require('../auth/authMiddleware')
const commerceValidator = require('./commerceValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.getProperties(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.getProperty(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), commerceValidator.fields, commerceValidator.uniqe, (req, res) => {
  commerceService.createProperty(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), commerceValidator.uniqe, (req, res) => {
  commerceService.updateProperty(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.deleteProperty(req, res)
})

router.post('/:id/photos', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.uploadPhotos(req, res)
})

module.exports = router
