const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./houseBuyer')
const houseBuyerResource = require('./houseBuyerResource')
const houseBuyerDAL = new BuyerDAL('buyers', 'house', Buyer)
const houseService = new BuyerService(houseBuyerDAL, houseBuyerResource)

const passport = require('passport')
require('../auth/authMiddleware')
const houseBuyerValidator = require('./houseBuyerValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.getBuyers(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.getBuyer(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), houseBuyerValidator.fields, (req, res) => {
  houseService.createBuyer(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.updateBuyer(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  houseService.deleteBuyer(req, res)
})

module.exports = router
