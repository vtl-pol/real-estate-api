const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const cryptojs = require('crypto-js')
const User = require('../user/user')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

async function authenticateWithToken (payload, done) {
  const bytes = cryptojs.AES.decrypt(payload.token, process.env.APP_JWT_SECRET)
  const tokenData = bytes.toString(cryptojs.enc.Utf8)
  try {
    const user = await User.findByAccessToken(tokenData)
    if (user.id === undefined) return done(null, false)

    return done(null, user)
  } catch (err) {
    done(err, false)
  }
}

passport.use(new JwtStrategy(options, authenticateWithToken))
