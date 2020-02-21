const express = require('express')
const router = express.Router()

router.get('/', function (_req, res) {
  res.send({
    name: 'HaldenCMS API v1'
  })
})

module.exports = router
