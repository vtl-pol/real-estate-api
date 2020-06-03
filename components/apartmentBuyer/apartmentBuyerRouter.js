const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./apartmentBuyer')
const apartmentBuyerResource = require('./apartmentBuyerResource')
const apartmentBuyerDAL = new BuyerDAL('buyers', 'apartment', Buyer)
const apartmentService = new BuyerService(apartmentBuyerDAL, apartmentBuyerResource)

const authMiddleware = require('../auth/authMiddleware')
const apartmentBuyerValidator = require('./apartmentBuyerValidator')
const buyerValidator = require('../archive/buyer/buyerValidator')

router.get('/', authMiddleware, (req, res) => {
  apartmentService.getBuyers(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  apartmentService.getBuyer(req, res)
})

router.post('/', authMiddleware, apartmentBuyerValidator.fields, (req, res) => {
  apartmentService.createBuyer(req, res)
})

router.put('/:id', authMiddleware, (req, res) => {
  apartmentService.updateBuyer(req, res)
})

router.delete('/:id/archive', authMiddleware, buyerValidator.archive, (req, res) => {
  apartmentService.archiveBuyer(req, res)
})

module.exports = router
