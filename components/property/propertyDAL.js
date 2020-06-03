const moment = require('moment')

const { db } = require('../../config')
const { Photo, photoDAL } = require('../photo')

class PropertyDAL {
  constructor (table, propType, PropertyModel) {
    this.tableName = table
    this.propType = propType
    this.PropertyModel = PropertyModel
    this.archiveMode = false
  }

  setArchiveMode () {
    this.archiveMode = true
  }

  table () {
    if (this.archiveMode) {
      return db(this.tableName).where({ type: this.propType })
        .whereNot({ archivedAt: null })
    }
    return db(this.tableName).where({ type: this.propType, archivedAt: null })
  }

  async filterAndLoad ({ filter, currentPage, perPage }) {
    const query = this.table()
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .select('properties.*', 'users.fullName AS authorName')

    const { data, pagination } = await query.paginate({ perPage, currentPage })
    const photos = await db('photos').where('propertyID', 'IN', data.map(i => i.id))
    const props = data.map(r => Object.assign(r, { photos: photos.filter(p => p.propertyID === r.id) }))
    const records = props.map(r => new this.PropertyModel(r))

    return { records, pagination }
  }

  async find (id) {
    const house = await this.table().where({ 'properties.id': id })
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .select('properties.*', 'users.fullName AS authorName')
      .first()
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

  async archive (id, payload) {
    return this.table().where({ id }).update({
      archivedAt: moment().format(),
      archivedReason: payload.archivedReason,
      archivedTill: (payload.archivedTill || null),
      soldByID: (payload.soldByID || null)
    })
  }

  async restoreFromArchive (id) {
    return this.table().where({ id }).update({
      archivedAt: null,
      archivedReason: null,
      archivedTill: null,
      soldByID: null
    })
  }

  async delete (id) {
    const item = await this.find(id)
    if (item && item.photos) {
      for (const photo of item.photos) {
        await photoDAL.delete(photo.id)
      }
    }
    return this.table().where({ id }).del()
  }
}

module.exports = PropertyDAL
