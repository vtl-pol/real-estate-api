const express = require('express')
const router = express.Router()
const userService = require('./userService')
const userValidator = require('./userValidator')

const { authMiddleware, adminMiddleware, notGuestMiddleware } = require('../auth/authMiddleware')

router.get('/me', authMiddleware, (req, res) => {
  userService.getCurrentUser(req, res)
})

router.put('/me', authMiddleware, userValidator.profile, userValidator.uniqe, (req, res) => {
  userService.updateUser(req, res)
})

router.get('/', authMiddleware, notGuestMiddleware, (req, res) => {
  userService.list(req, res)
})

router.post('/', authMiddleware, adminMiddleware, userValidator.fields, userValidator.uniqe, (req, res) => {
  userService.reqisterUser(req, res)
})

router.put('/:id', authMiddleware, adminMiddleware, userValidator.fields, userValidator.uniqe, (req, res) => {
  userService.updateUser(req, res)
})

module.exports = router
