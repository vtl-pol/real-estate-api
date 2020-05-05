const express = require('express')
const router = express.Router()

const constantsService = require('./constantsService')

const passport = require('passport')
require('../auth/authMiddleware')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  constantsService.get(req, res)
})

module.exports = router
