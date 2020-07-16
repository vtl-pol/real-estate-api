const express = require('express')
const router = express.Router()

const BuyerDAL = require('../buyer/buyerDAL')
const BuyerService = require('../buyer/buyerService')

const Buyer = require('./apartmentBuyer')
const apartmentBuyerResource = require('./apartmentBuyerResource')
const apartmentBuyerDAL = new BuyerDAL('buyers', 'apartment', Buyer)
const apartmentService = new BuyerService(apartmentBuyerDAL, apartmentBuyerResource)

const { authMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')
const apartmentBuyerValidator = require('./apartmentBuyerValidator')
const buyerValidator = require('../archive/buyer/buyerValidator')
const contactValidator = require('../contact/contactValidator')

router.get('/', authMiddleware, apartmentBuyerValidator.filters, (req, res) => {
  apartmentService.getBuyers(req, res)
})

router.get('/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  apartmentService.getFavorites(req, res)
})

router.get('/:id', authMiddleware, (req, res) => {
  apartmentService.getBuyer(req, res)
})

router.post('/', authMiddleware, notGuestMiddleware, apartmentBuyerValidator.fields, contactValidator.exists, (req, res) => {
  apartmentService.createBuyer(req, res)
})

router.put('/:id', authMiddleware, contactValidator.exists, (req, res) => {
  apartmentService.updateBuyer(req, res)
})

router.delete('/:id/archive', authMiddleware, buyerValidator.archive, (req, res) => {
  apartmentService.archiveBuyer(req, res)
})

router.patch('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  apartmentService.saveToFavorites(req, res)
})

router.delete('/:id/favorites', authMiddleware, notGuestMiddleware, (req, res) => {
  apartmentService.removeFromFavorites(req, res)
})

module.exports = router
