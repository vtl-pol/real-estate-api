const { db } = require('../../config')
const { Photo } = require('../photo')

class PropertyDAL {
  constructor (table, propType, PropertyModel) {
    this.table = table
    this.propType = propType
    this.PropertyModel = PropertyModel
  }

  async filterAndLoad ({ filter, currentPage, perPage }) {
    const query = db(this.table)
      .where({ type: this.propType })
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .leftJoin(db('photos').select('propertyID').min('filePath', { as: 'featuredImage' }).groupBy('propertyID').as('photos'), 'properties.id', '=', 'photos.propertyID')

      .select('properties.*', 'users.fullName AS authorName', 'photos.featuredImage')

    const { data, pagination } = await query.paginate({ perPage, currentPage })
    const houses = data.map(r => new this.PropertyModel(r))

    return { houses, pagination }
  }

  async find (id) {
    const house = await db(this.table).where({ id }).first()
    const photos = await db('photos').where({ propertyID: house.id })
    house.photos = photos.map(ph => new Photo(ph))
    return new this.PropertyModel(house)
  }

  async propertyExists (filter, id = null) {
    const result = await db(this.table).where(filter).whereNot({ id }).limit(1).select('id').first()

    return (result !== undefined)
  }

  async create (payload) {
    payload.type = this.propType
    const houseID = await db(this.table).insert(payload)
    const house = await this.find(houseID)

    return house
  }

  async update (id, payload) {
    const result = await db(this.table).update(payload).where({ id })
    return result
  }

  async delete (id) {
    return db(this.table).where({ id }).del()
  }
}

module.exports = PropertyDAL
