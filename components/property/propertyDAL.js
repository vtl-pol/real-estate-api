const moment = require('moment')

const { db } = require('../../config')
const { Photo } = require('../photo')

class PropertyDAL {
  constructor (table, propType, PropertyModel) {
    this.tableName = table
    this.propType = propType
    this.PropertyModel = PropertyModel
  }

  table () {
    return db(this.tableName).where({ type: this.propType })
  }

  async filterAndLoad ({ filter, currentPage, perPage }) {
    const query = this.table()
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .leftJoin(db('photos').select('propertyID').min('filePath', { as: 'featuredImage' }).groupBy('propertyID').as('photos'), 'properties.id', '=', 'photos.propertyID')

      .select('properties.*', 'users.fullName AS authorName', 'photos.featuredImage')

    const { data, pagination } = await query.paginate({ perPage, currentPage })
    const properties = data.map(r => new this.PropertyModel(r))

    return { properties, pagination }
  }

  async find (id) {
    const house = await this.table().where({ id }).first()
    if (!house) {
      return null
    }
    const photos = await db('photos').where({ propertyID: house.id })
    house.photos = photos.map(ph => new Photo(ph))
    return new this.PropertyModel(house)
  }

  async propertyExists (filter, id = null) {
    const result = await this.table().where(filter).whereNot({ id }).limit(1).select('id').first()

    return (result !== undefined)
  }

  async create (payload) {
    payload.type = this.propType
    const houseID = await db(this.tableName).insert(payload)
    const house = await this.find(houseID)

    return house
  }

  async update (id, payload) {
    if (payload.ownerBirthday) {
      payload.ownerBirthday = moment(payload.ownerBirthday, 'DD-MM-YYYY').format()
    }
    const result = await this.table().update(payload).where({ id })
    return result
  }

  async delete (id) {
    return this.table().where({ id }).del()
  }
}

module.exports = PropertyDAL
