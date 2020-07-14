const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./houseBuyer')
const houseBuyerResource = require('./houseBuyerResource')
const houseBuyerDAL = new BuyerDAL('buyers', 'house', Buyer)
const houseService = new BuyerService(houseBuyerDAL, houseBuyerResource)

const { authMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')
const houseBuyerValidator = require('./houseBuyerValidator')
const buyerValidator = require('../archive/buyer/buyerValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', authMiddleware, (req, res) => {
  houseService.getBuyers(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  houseService.getBuyer(req, res)
})

router.post('/', authMiddleware, notGuestMiddleware, houseBuyerValidator.fields, contactValidator.exists, (req, res) => {
  houseService.createBuyer(req, res)
})

router.put('/:id', authMiddleware, contactValidator.exists, (req, res) => {
  houseService.updateBuyer(req, res)
})

router.delete('/:id/archive', authMiddleware, buyerValidator.archive, (req, res) => {
  houseService.archiveBuyer(req, res)
})

module.exports = router
