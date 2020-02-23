class Entity {
  constructor (db, tableName) {
    this.db = db
    this.tableName = tableName
  }

  table () {
    return this.db(this.tableName)
  }

  async all () {
    const records = await this.table()
      .select('*')

    return records
  }

  async find (id) {
    const result = await this.table()
      .select('*')
      .where({ id })
      .first()

    return result
  }

  async delete (id) {
    const result = await this.table()
      .where({ id })
      .del()

    return result
  }

  async create (payload) {
    try {
      const result = await this.table().insert(payload)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async update (payload) {
    try {
      const result = await this.table().update(payload)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async count () {
    const count = await this.table()
      .count()

    return count[0]['count(*)']
  }
}

module.exports = Entity
