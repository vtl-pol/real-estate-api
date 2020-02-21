const express = require('express')
const appRouter = express.Router()
const indexRouter = require('../components/index/router')

appRouter.use('/', indexRouter)

module.exports = appRouter
