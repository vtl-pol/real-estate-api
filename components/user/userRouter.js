const express = require('express')
const router = express.Router()
const userService = require('./userService')

const { authMiddleware } = require('../auth/authMiddleware')

router.get('/me', authMiddleware, (req, res) => {
  userService.getCurrentUser(req, res)
})

module.exports = router
