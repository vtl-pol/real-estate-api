const moment = require('moment')
const { adapter, Entity } = require('../../config/db')

/**
 * User = {
 *   fullName: String,
 *   rank: Number,
 *   role: Number,
 *   isOnContract: Boolean,
 *   isOfficial: Boolean,
 *   attachmentId: Number,
 *   phone: Number,
 *   email: String,
 *   password: String
 * }
 */
class User extends Entity {
  async findByEmail (email) {
    const user = await this.table()
      .where({ email })
      .first()
    return user
  }

  async findByAccessToken (token) {
    const user = await this.table()
      .where({
        accessToken: token
      })
      .where('tokenIssuedAt', '>=', moment().subtract(7, 'd').format())
      .first()

    return user
  }
}

module.exports = new User(adapter, 'users')
