const express = require('express')
const router = express.Router()
const userService = require('./userService')
const passport = require('passport')
require('../auth/authMiddleware')

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  userService.getCurrentUser(req, res)
})

module.exports = router
