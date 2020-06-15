const { db } = require('../../config')
// const { without } = require('../../utils/object')

class SettlementDAL {
  constructor (table) {
    this.tableName = table
  }

  table () {
    return db(this.tableName)
  }

  async load () {
    const settlements = (await this.table()).map(s => s.name)
    const districts = await db('districts').where('settlement', 'IN', settlements)

    return settlements.map(s => Object({ name: s, districts: districts.filter(d => d.settlement === s) }))
  }
}

module.exports = new SettlementDAL('settlements')
