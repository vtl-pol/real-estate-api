const bcrypt = require('bcrypt')
const userDAL = require('./userDAL')

class UserService {
  constructor (userDAL) {
    this.userDAL = userDAL
  }

  async generateHash (entry) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(entry, 5, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  }

  async reqisterUser (req, res) {
    const payload = req.body
    try {
      payload.password = await this.generateHash(payload.password)
      const user = await this.userDAL.create(payload)
      res.send({ success: true, user })
    } catch (err) {
      console.error(err)
      res.status(500).send({ success: false, error: err.message })
    }
  }

  async updateProfile (req, res) {
    req.params.id = req.user.id
    return this.updateUser(req, res)
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

  async list (req, res) {
    const page = req.query.page || 1
    const perPage = req.query.perPage || 16

    try {
      const { users, pagination } = await this.userDAL.searchUsers(req.query.q, page, perPage)
      res.send({ users, pagination })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        error: error.message
      })
    }
  }

  async updateUser (req, res) {
    try {
      if (req.body.password) {
        req.body.password = await this.generateHash(req.body.password)
      }
      const result = await this.userDAL.update(req.params.id, req.body)
      if (result) {
        const user = await this.userDAL.findByID(req.params.id)
        res.send({ success: true, user })
      } else {
        res.status(404).send({ success: false, error: `Користувача з ID #${req.params.id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: error.message })
    }
  }
}

module.exports = new UserService(userDAL)
