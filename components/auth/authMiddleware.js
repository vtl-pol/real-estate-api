const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const cryptojs = require('crypto-js')

const userDAL = require('../user/userDAL')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

async function authenticateWithToken (payload, done) {
  const bytes = cryptojs.AES.decrypt(payload.token, process.env.APP_JWT_SECRET)
  const tokenData = bytes.toString(cryptojs.enc.Utf8)
  try {
    const user = await userDAL.findByAccessToken(tokenData)
    if (user === undefined || user.id === null) return done(null, false)

    return done(null, user)
  } catch (err) {
    done(err, false)
  }
}

passport.use(new JwtStrategy(options, authenticateWithToken))

const authMiddleware = passport.authenticate('jwt', { session: false })

const softAuthMiddleware = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user, _info) => {
  if (err !== null) {
    return res.status(500).send({ error: err })
  }
  if (user === false) {
    user = userDAL.generateGuest()
  }
  req.user = user
  return next()
})(req, res, next)

const adminMiddleware = (req, res, next) => {
  if (req.user.isAdmin()) {
    return next()
  }
  res.status(403).send({
    message: 'У вас немає доступу до цієї сторінки'
  })
}

const managerMiddleware = (req, res, next) => {
  if (req.user.isManager() || req.user.isAgent()) {
    return next()
  }
  res.status(403).send({
    message: 'У вас немає доступу до цієї сторінки'
  })
}

module.exports = { authMiddleware, softAuthMiddleware, adminMiddleware, managerMiddleware }
