const express = require('express')
const router = express.Router()

const passport = require('passport')
require('../../auth/authMiddleware')

const { BuyerDAL } = require('../../buyer')
const ArchiveService = require('../archiveService')

const { apartmentBuyer, apartmentBuyerResource } = require('../../apartmentBuyer')
const apartmentDAL = new BuyerDAL('buyers', 'apartment', apartmentBuyer)
const aptBuyerArchive = new ArchiveService(apartmentDAL, apartmentBuyerResource)

const { houseBuyer, houseBuyerResource } = require('../../house')
const houseDAL = new BuyerDAL('buyers', 'house', houseBuyer)
const houseBuyerArchive = new ArchiveService(houseDAL, houseBuyerResource)

const { commerceBuyer, commerceBuyerResource } = require('../../commerce')
const commerceDAL = new BuyerDAL('buyers', 'commerce', commerceBuyer)
const commerceBuyerArchive = new ArchiveService(commerceDAL, commerceBuyerResource)

router.get('/apartments', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptBuyerArchive.archivedList(req, res)
})
router.get('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptBuyerArchive.archivedItem(req, res)
})
router.patch('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptBuyerArchive.restoreItem(req, res)
})
router.delete('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptBuyerArchive.deleteItem(req, res)
})

router.get('/houses', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseBuyerArchive.archivedList(req, res)
})
router.get('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseBuyerArchive.archivedItem(req, res)
})
router.patch('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseBuyerArchive.restoreItem(req, res)
})
router.delete('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseBuyerArchive.deleteItem(req, res)
})

router.get('/commerce', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceBuyerArchive.archivedList(req, res)
})
router.get('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceBuyerArchive.archivedItem(req, res)
})
router.patch('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceBuyerArchive.restoreItem(req, res)
})
router.delete('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceBuyerArchive.deleteItem(req, res)
})

module.exports = router
