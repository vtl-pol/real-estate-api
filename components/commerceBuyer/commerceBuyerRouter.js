const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./commerceBuyer')
const commerceBuyerResource = require('./commerceBuyerResource')
const commerceBuyerDAL = new BuyerDAL('buyers', 'commerce', Buyer)
const commerceService = new BuyerService(commerceBuyerDAL, commerceBuyerResource)

const { authMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')
const commerceBuyerValidator = require('./commerceBuyerValidator')
const buyerValidator = require('../archive/buyer/buyerValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', authMiddleware, commerceBuyerValidator.filters, (req, res) => {
  commerceService.getBuyers(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  commerceService.getBuyer(req, res)
})

router.post('/', authMiddleware, notGuestMiddleware, commerceBuyerValidator.fields, contactValidator.exists, (req, res) => {
  commerceService.createBuyer(req, res)
})

router.put('/:id', authMiddleware, contactValidator.exists, (req, res) => {
  commerceService.updateBuyer(req, res)
})

router.delete('/:id/archive', authMiddleware, buyerValidator.archive, (req, res) => {
  commerceService.archiveBuyer(req, res)
})

router.patch('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  commerceService.saveToFavorites(req, res)
})

router.delete('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  commerceService.removeFromFavorites(req, res)
})

module.exports = router
