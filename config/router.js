const express = require('express')
const appRouter = express.Router()
const indexRouter = require('../components/index/router')
const { authRouter } = require('../components/auth')
const { userRouter } = require('../components/user')

appRouter.use('/', indexRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/users', userRouter)

module.exports = appRouter
