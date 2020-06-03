const express = require('express')
const router = express.Router()

const passport = require('passport')
require('../../auth/authMiddleware')

const { PropertyDAL } = require('../../property')
const ArchiveService = require('../archiveService')

const { Apartment, apartmentResource } = require('../../apartment')
const apartmentDAL = new PropertyDAL('properties', 'apartment', Apartment)
const aptArchive = new ArchiveService(apartmentDAL, apartmentResource)

const { House, houseResource } = require('../../house')
const houseDAL = new PropertyDAL('properties', 'house', House)
const houseArchive = new ArchiveService(houseDAL, houseResource)

const { Commerce, commerceResource } = require('../../commerce')
const commerceDAL = new PropertyDAL('properties', 'commerce', Commerce)
const commerceArchive = new ArchiveService(commerceDAL, commerceResource)

router.get('/apartments', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptArchive.archivedList(req, res)
})
router.get('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptArchive.archivedItem(req, res)
})
router.patch('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptArchive.restoreItem(req, res)
})
router.delete('/apartments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  aptArchive.deleteItem(req, res)
})

router.get('/houses', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseArchive.archivedList(req, res)
})
router.get('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseArchive.archivedItem(req, res)
})
router.patch('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseArchive.restoreItem(req, res)
})
router.delete('/houses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseArchive.deleteItem(req, res)
})

router.get('/commerce', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceArchive.archivedList(req, res)
})
router.get('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceArchive.archivedItem(req, res)
})
router.patch('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceArchive.restoreItem(req, res)
})
router.delete('/commerce/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceArchive.deleteItem(req, res)
})

module.exports = router
