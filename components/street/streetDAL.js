const { db } = require('../../config')

class StreetDAL {
  constructor (table) {
    this.tableName = table
  }

  table () {
    return db(this.tableName)
  }

  async load () {
    const streets = (await this.table()).map(s => s.name)

    return streets
  }
}

module.exports = new StreetDAL('streets')
