const bcrypt = require('bcrypt')
const { User, userService } = require('../user')
const moment = require('moment')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

class AuthService {
  async checkPassword (password, user = {}) {
    return bcrypt.compare(password, user.password)
  }

  async issueAccessToken (user) {
    try {
      const accessToken = await userService.generateHash(JSON.stringify(user))
      const tokenIssuedAt = moment().format()

      await User.update({ accessToken, tokenIssuedAt })

      const encryptedData = cryptojs.AES.encrypt(accessToken, process.env.APP_JWT_SECRET)

      const token = jwt.sign({
        token: encryptedData.toString()
      }, process.env.APP_JWT_SECRET)

      return { token }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  async authenticate (req, res) {
    try {
      const user = await User.findByEmail(req.body.email)
      const passwordMatch = await this.checkPassword(req.body.password, user)

      if (user === undefined || !passwordMatch) {
        res.status(400).send({
          success: false,
          error: 'Невірний Email або пароль'
        })
        return
      }

      const { error, token } = await this.issueAccessToken(user)

      res.send({ success: (token !== null), access_token: token, error: error })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new AuthService()
