const express = require('express')

const router = express.Router()

const StreetService = require('./streetService')
const streetDAL = require('./streetDAL')
const streetService = new StreetService(streetDAL)

const { authMiddleware } = require('../auth/authMiddleware')

router.get('/', authMiddleware, (req, res) => {
  streetService.list(req, res)
})

module.exports = router
