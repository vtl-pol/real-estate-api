const moment = require('moment')

class Entity {
  constructor (db, tableName) {
    this.db = db
    this.tableName = tableName
  }

  defaultFilter () {
    return null
  }

  table () {
    let builder = this.db(this.tableName)
    if (this.defaultFilter()) {
      builder = builder.where(this.defaultFilter())
    }
    return builder
  }

  withPagination (currentPage, perPage) {
    return this.table().paginate({ perPage, currentPage })
  }

  async all () {
    const records = await this.table()

    return records
  }

  async find (id) {
    const result = await this.table()
      .where({ id })
      .first()

    return result
  }

  async findBy (payload) {
    return this.table().where(payload)
  }

  async recordExists (filter, id = null) {
    const result = await this.table().where(filter).whereNot({ id }).limit(1).select('id').first()

    return (result !== undefined)
  }

  async delete (id) {
    const result = await this.table()
      .where({ id })
      .del()

    return result
  }

  async create (payload) {
    payload.created_at = moment().format()
    payload.updated_at = moment().format()
    const result = await this.table().insert(payload)
    return result
  }

  async update (id, payload) {
    const result = await this.table().update(payload).where({ id })
    return result
  }

  async count () {
    const count = await this.table()
      .count()

    return count[0]['count(*)']
  }
}

module.exports = Entity
