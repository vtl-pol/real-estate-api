const express = require('express')
const router = express.Router()

const { propertyRouter } = require('./property')
const { buyerRouter } = require('./buyer')

router.use('/properties', propertyRouter)
router.use('/buyers', buyerRouter)

module.exports = router
