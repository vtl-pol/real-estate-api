const express = require('express')
const router = express.Router()

const authMiddleware = require('../../auth/authMiddleware')

const { PropertyDAL } = require('../../property')
const ArchiveService = require('../archiveService')

const { Apartment, apartmentResource, apartmentValidator } = require('../../apartment')
const apartmentDAL = new PropertyDAL('properties', 'apartment', Apartment)
const aptArchive = new ArchiveService(apartmentDAL, apartmentResource)

const { House, houseResource, houseValidator } = require('../../house')
const houseDAL = new PropertyDAL('properties', 'house', House)
const houseArchive = new ArchiveService(houseDAL, houseResource)

const { Commerce, commerceResource, commerceValidator } = require('../../commerce')
const commerceDAL = new PropertyDAL('properties', 'commerce', Commerce)
const commerceArchive = new ArchiveService(commerceDAL, commerceResource)

const archiveValidator = require('./propertyValidator')

router.get('/apartments', authMiddleware, apartmentValidator.filters, archiveValidator.filters, (req, res) => {
  aptArchive.archivedList(req, res)
})
router.get('/apartments/:id', authMiddleware, (req, res) => {
  aptArchive.archivedItem(req, res)
})
router.patch('/apartments/:id/restore', authMiddleware, (req, res) => {
  aptArchive.restoreItem(req, res)
})
router.delete('/apartments/:id', authMiddleware, (req, res) => {
  aptArchive.deleteItem(req, res)
})

router.get('/houses', authMiddleware, houseValidator.filters, archiveValidator.filters, (req, res) => {
  houseArchive.archivedList(req, res)
})
router.get('/houses/:id', authMiddleware, (req, res) => {
  houseArchive.archivedItem(req, res)
})
router.patch('/houses/:id/restore', authMiddleware, (req, res) => {
  houseArchive.restoreItem(req, res)
})
router.delete('/houses/:id', authMiddleware, (req, res) => {
  houseArchive.deleteItem(req, res)
})

router.get('/commerce', authMiddleware, commerceValidator.filters, archiveValidator.filters, (req, res) => {
  commerceArchive.archivedList(req, res)
})
router.get('/commerce/:id', authMiddleware, (req, res) => {
  commerceArchive.archivedItem(req, res)
})
router.patch('/commerce/:id/restore', authMiddleware, (req, res) => {
  commerceArchive.restoreItem(req, res)
})
router.delete('/commerce/:id', authMiddleware, (req, res) => {
  commerceArchive.deleteItem(req, res)
})

module.exports = router
