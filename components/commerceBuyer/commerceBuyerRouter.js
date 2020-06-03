const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./commerceBuyer')
const commerceBuyerResource = require('./commerceBuyerResource')
const commerceBuyerDAL = new BuyerDAL('buyers', 'commerce', Buyer)
const commerceService = new BuyerService(commerceBuyerDAL, commerceBuyerResource)

const authMiddleware = require('../auth/authMiddleware')
const commerceBuyerValidator = require('./commerceBuyerValidator')
const buyerValidator = require('../archive/buyer/buyerValidator')

router.get('/', authMiddleware, (req, res) => {
  commerceService.getBuyers(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  commerceService.getBuyer(req, res)
})

router.post('/', authMiddleware, commerceBuyerValidator.fields, (req, res) => {
  commerceService.createBuyer(req, res)
})

router.put('/:id', authMiddleware, (req, res) => {
  commerceService.updateBuyer(req, res)
})

router.delete('/:id/archive', authMiddleware, buyerValidator.archive, (req, res) => {
  commerceService.archiveBuyer(req, res)
})

module.exports = router
