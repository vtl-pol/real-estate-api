const express = require('express')

const router = express.Router()

const SettlementService = require('./settlementService')
const settlementDAL = require('./settlementDAL')
const settlementService = new SettlementService(settlementDAL)

const { authMiddleware } = require('../auth/authMiddleware')

router.get('/', authMiddleware, (req, res) => {
  settlementService.list(req, res)
})

module.exports = router
