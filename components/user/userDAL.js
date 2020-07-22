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
    userPayload.email = userPayload.email.toLowerCase()
    const [resultID] = await db(this.table).insert(userPayload)
    const user = await this.findByID(resultID)

    return user
  }

  async update (id, payload) {
    const result = await db(this.table).update(payload).where({ id })

    return result
  }

  async first () {
    const result = await db(this.table).limit(1)
    return result
  }

  async searchUsers (query = '', currentPage = 1, perPage = 5) {
    const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1)
    const lowercasedQuery = query.toLowerCase()
    const phoneQuery = query.replace(/\D/g, '')
    const { data, pagination } = await db(this.table)
      .where('fullName', 'like', `%${query}%`)
      .orWhere('fullName', 'like', `%${lowercasedQuery}%`)
      .orWhere('fullName', 'like', `%${capitalizedQuery}%`)
      .orWhere('email', 'like', `%${lowercasedQuery}%`)
      .orWhere('phone', 'like', `%${(phoneQuery !== '') ? phoneQuery : '--'}%`)
      .paginate({ perPage, currentPage })

    return { users: data.map(r => new User(r)), pagination }
  }

  async checkExists (filter, id = null) {
    const result = await db(this.table).whereNot('id', id).where(filter).count('id AS count').first()

    return result.count > 0
  }
}

module.exports = new UserDAL('users')
