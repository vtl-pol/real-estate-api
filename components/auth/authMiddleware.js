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
