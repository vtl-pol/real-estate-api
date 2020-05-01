const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./commerceBuyer')
const commerceBuyerResource = require('./commerceBuyerResource')
const commerceBuyerDAL = new BuyerDAL('buyers', 'commerce', Buyer)
const commerceService = new BuyerService(commerceBuyerDAL, commerceBuyerResource)

const passport = require('passport')
require('../auth/authMiddleware')
const commerceBuyerValidator = require('./commerceBuyerValidator')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.getBuyers(req, res)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.getBuyer(req, res)
})

router.post('/', passport.authenticate('jwt', { session: false }), commerceBuyerValidator.fields, (req, res) => {
  commerceService.createBuyer(req, res)
})

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.updateBuyer(req, res)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  commerceService.deleteBuyer(req, res)
})

module.exports = router
