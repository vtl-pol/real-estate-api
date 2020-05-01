const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./apartmentBuyer')
const apartmentBuyerResource = require('./apartmentBuyerResource')
const apartmentBuyerDAL = new BuyerDAL('buyers', 'apartment', Buyer)
const apartmentService = new BuyerService(apartmentBuyerDAL, apartmentBuyerResource)

const passport = require('passport')
require('../auth/authMiddleware')
const apartmentBuyerValidator = require('./apartmentBuyerValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.getBuyers(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.getBuyer(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), apartmentBuyerValidator.fields, (req, res) => {
  apartmentService.createBuyer(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.updateBuyer(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  apartmentService.deleteBuyer(req, res)
})

module.exports = router
