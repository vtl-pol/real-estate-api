const express = require('express')
const appRouter = express.Router()
const indexRouter = require('../components/index/router')
const { authRouter } = require('../components/auth')
const { userRouter } = require('../components/user')
const { houseRouter } = require('../components/house')

appRouter.use('/', indexRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/users', userRouter)
appRouter.use('/houses', houseRouter)

module.exports = appRouter
