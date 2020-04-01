const moment = require('moment')

const { db } = require('../../config')
const User = require('./user')

class UserDAL {
  constructor (table) {
    this.table = table
  }

  async findByID (id) {
    const user = await db(this.table).where({ id }).first()
    return new User(user)
  }

  async findByEmail (email) {
    const user = await db(this.table).where({ email }).first()

    return new User(user)
  }

  async findByAccessToken (accessToken) {
    const user = await db(this.table)
      .where({ accessToken })
      .where('tokenIssuedAt', '>=', moment().subtract(7, 'd').format())
      .first()

    return new User(user)
  }

  async create (userPayload) {
    const [resultID] = await db(this.table).insert(userPayload)
    const user = await this.findByID(resultID)

    return user
  }

  async update (id, payload) {
    const result = await db(this.table).update(payload).where({ id })

    return result
  }
}

module.exports = new UserDAL('users')
