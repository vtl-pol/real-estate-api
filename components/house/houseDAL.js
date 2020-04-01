const { db } = require('../../config')
const House = require('./house')

const type = 'house'

class HouseDAL {
  constructor (table) {
    this.table = table
  }

  async filterAndLoad ({ filter, currentPage, perPage }) {
    const query = db(this.table)
      .where({ type })
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .leftJoin(db('photos').select('propertyID').min('filePath', { as: 'featuredImage' }).groupBy('propertyID').as('photos'), 'properties.id', '=', 'photos.propertyID')

      .select('properties.*', 'users.fullName AS authorName', 'photos.featuredImage')

    console.log(query.toSQL().sql)
    const { data, pagination } = await query.paginate({ perPage, currentPage })
    const houses = data.map(r => new House(r))

    return { houses, pagination }
  }

  async find (id) {
    const house = await db(this.table).where({ id }).first()

    return new House(house)
  }

  async houseExists (filter, id = null) {
    const result = await db(this.table).where(filter).whereNot({ id }).limit(1).select('id').first()

    return (result !== undefined)
  }

  async create (payload) {
    payload.type = type
    const houseID = await db(this.table).insert(payload)
    const house = await this.find(houseID)

    return house
  }

  async update (id, payload) {
    const result = await db(this.table).update(payload).where({ id })
    return result
  }

  async delete () {
  }
}

module.exports = new HouseDAL('properties')
