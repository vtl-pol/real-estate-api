const express = require('express')
const router = express.Router()

const { authMiddleware, adminMiddleware } = require('../../auth/authMiddleware')

const { BuyerDAL } = require('../../buyer')
const ArchiveService = require('../archiveService')

const { apartmentBuyer, apartmentBuyerResource, apartmentBuyerValidator } = require('../../apartmentBuyer')
const apartmentDAL = new BuyerDAL('buyers', 'apartment', apartmentBuyer)
const aptBuyerArchive = new ArchiveService(apartmentDAL, apartmentBuyerResource)

const { houseBuyer, houseBuyerResource, houseBuyerValidator } = require('../../houseBuyer')
const houseDAL = new BuyerDAL('buyers', 'house', houseBuyer)
const houseBuyerArchive = new ArchiveService(houseDAL, houseBuyerResource)

const { commerceBuyer, commerceBuyerResource, commerceBuyerValidator } = require('../../commerceBuyer')
const commerceDAL = new BuyerDAL('buyers', 'commerce', commerceBuyer)
const commerceBuyerArchive = new ArchiveService(commerceDAL, commerceBuyerResource)

const archiveValidator = require('./buyerValidator')

router.get('/apartments', authMiddleware, apartmentBuyerValidator.filters, archiveValidator.filters, (req, res) => {
  aptBuyerArchive.archivedList(req, res)
})
router.get('/apartments/:id', authMiddleware, (req, res) => {
  aptBuyerArchive.archivedItem(req, res)
})
router.patch('/apartments/:id/restore', authMiddleware, adminMiddleware, (req, res) => {
  aptBuyerArchive.restoreItem(req, res)
})
router.delete('/apartments/:id', authMiddleware, adminMiddleware, (req, res) => {
  aptBuyerArchive.deleteItem(req, res)
})

router.get('/houses', authMiddleware, houseBuyerValidator.filters, archiveValidator.filters, (req, res) => {
  houseBuyerArchive.archivedList(req, res)
})
router.get('/houses/:id', authMiddleware, (req, res) => {
  houseBuyerArchive.archivedItem(req, res)
})
router.patch('/houses/:id/restore', authMiddleware, adminMiddleware, (req, res) => {
  houseBuyerArchive.restoreItem(req, res)
})
router.delete('/houses/:id', authMiddleware, adminMiddleware, (req, res) => {
  houseBuyerArchive.deleteItem(req, res)
})

router.get('/commerce', authMiddleware, commerceBuyerValidator.filters, archiveValidator.filters, (req, res) => {
  commerceBuyerArchive.archivedList(req, res)
})
router.get('/commerce/:id', authMiddleware, (req, res) => {
  commerceBuyerArchive.archivedItem(req, res)
})
router.patch('/commerce/:id/restore', authMiddleware, adminMiddleware, (req, res) => {
  commerceBuyerArchive.restoreItem(req, res)
})
router.delete('/commerce/:id', authMiddleware, adminMiddleware, (req, res) => {
  commerceBuyerArchive.deleteItem(req, res)
})

module.exports = router
