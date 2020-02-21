class Entity {
  constructor (adapter, tableName) {
    this.db = adapter
    this.tableName = tableName
  }

  table () {
    return this.db(this.tableName)
  }

  find (id) {
    return this.table()
      .select('*')
      .where({ id })
      .first()
  }
}

module.exports = Entity
