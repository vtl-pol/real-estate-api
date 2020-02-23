const express = require('express')
const router = express.Router()
const authService = require('./authService')
const authValidator = require('./authValidator')

router.post('/login', authValidator.login, (req, res) => {
  authService.authenticate(req, res)
})

module.exports = router
