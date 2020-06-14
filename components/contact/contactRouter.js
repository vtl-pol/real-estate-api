const express = require('express')
const router = express.Router()

const ContactDAL = require('./contactDAL')
const ContactService = require('./contactService')

const contactDAL = new ContactDAL('contacts')
const contactService = new ContactService(contactDAL)

const authMiddleware = require('../auth/authMiddleware')
const contactValidator = require('./contactValidator')

router.get('/', authMiddleware, (req, res) => {
  contactService.list(req, res)
})

router.post('/', authMiddleware, contactValidator.fields, (req, res) => {
  contactService.create(req, res)
})

router.get('/search', authMiddleware, (req, res) => {
  contactService.search(req, res)
})

router.put('/:id', authMiddleware, contactValidator.fields, (req, res) => {
  contactService.update(req, res)
})

module.exports = router
