const bcrypt = require('bcrypt')
const userDAL = require('./userDAL')

class UserService {
  async generateHash (entry) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(entry, 5, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  }

  async reqisterUser (payload) {
    try {
      payload.password = await this.generateHash(payload.password)
    } catch (err) {
      console.error(err)
      return err
    }

    return userDAL.create(payload)
  }

  async getCurrentUser (req, res) {
    res.send({
      email: req.user.email,
      fullName: req.user.fullName,
      rank: req.user.rank,
      role: req.user.role,
      isOnContract: req.user.isOnContract,
      isOfficial: req.user.isOfficial,
      attachmentId: req.user.attachmentId,
      phone: req.user.phone
    })
  }
}

module.exports = new UserService()
