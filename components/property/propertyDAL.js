const moment = require('moment')

const { db } = require('../../config')
const { Photo, photoDAL } = require('../photo')
const objectUtils = require('../../utils/object')
const propertyFilters = require('./propertyFilters')

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
      .leftJoin('districts', 'districts.id', '=', 'properties.districtID')
      .select('properties.*', 'users.fullName AS authorName', 'districts.name AS districtName')

    const filteredQuery = this.applyFilters(query, filter)

    const { data, pagination } = await filteredQuery.paginate({ perPage, currentPage })
    const photos = await db('photos').where('propertyID', 'IN', data.map(i => i.id))
    const props = data.map(r => Object.assign(r, { photos: photos.filter(p => p.propertyID === r.id) }))
    const contacts = await this.loadContactsFor(props.map(r => r.id))

    const records = props.map(pr => Object.assign(pr, { contacts: contacts.filter(c => c.contactableID === pr.id) })).map(r => new this.PropertyModel(r))

    return { records, pagination }
  }

  applyFilters (query, filter) {
    if (Object.keys(filter).length === 0) {
      return query
    }

    propertyFilters.forEach(f => {
      if (!filter[f.field]) return
      query = f.exec(query, filter[f.field])
    })
    return query
  }

  async find (id) {
    const property = await this.table().where({ 'properties.id': id })
      .leftJoin('users', 'properties.authorID', '=', 'users.id')
      .select('properties.*', 'users.fullName AS authorName')
      .first()
    if (!property) {
      return null
    }
    const photos = await db('photos').where({ propertyID: property.id })
    property.photos = photos.map(ph => new Photo(ph))

    const contacts = await this.loadContactsFor([property.id])

    Object.assign(property, { contacts })

    return new this.PropertyModel(property)
  }

  async findBasic (id) {
    const property = await this.table().where({ id }).select('id', 'responsibleID', 'source').first()
    if (!property) {
      return null
    }
    return new this.PropertyModel(property)
  }

  async loadContactsFor (propertyIDs) {
    const contacts = await db('contacts')
      .join('contacts_relations', 'contacts.id', '=', 'contacts_relations.contactID')
      .where('contacts_relations.contactableID', 'IN', propertyIDs)
      .where('contacts_relations.contactableType', this.tableName)
      .select('contacts.*', 'contacts_relations.contactableID')

    const phones = await db('phones').where('contactID', 'IN', contacts.map(c => c.id))

    contacts.map(r => {
      return Object.assign(r, { phones: phones.filter(p => p.contactID === r.id) })
    })

    return contacts
  }

  async propertyExists (filter, id = null) {
    const result = await this.table().where(filter).whereNot({ id }).limit(1).select('id').first()

    return (result !== undefined)
  }

  async create (payload) {
    payload.type = this.propType
    const record = objectUtils.without(['contactsIDs'], payload)
    try {
      const recordID = await db.transaction(async trx => {
        const recordID = await db(this.tableName).insert(record)

        if (!payload.contactsIDs.length) {
          return recordID
        }
        const result = await this.syncContacts(recordID, payload.contactsIDs, trx)

        if (result) {
          return recordID
        }
      })
      const property = await this.find(recordID)

      return property
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async update (id, payload) {
    const result = await this.table().update(objectUtils.without(['contactsIDs'], payload)).where({ id })

    if (!payload.contactsIDs || payload.contactsIDs.length) {
      return result
    }
    const contactsOK = await this.syncContacts(id, payload.contactsIDs)

    if (contactsOK) {
      return result
    }
  }

  async syncContacts (recordID, contactsIDs, trx = null) {
    if (trx === null) { trx = db }

    const contactsPayload = contactsIDs.map(cID => {
      return {
        contactableID: recordID,
        contactableType: this.tableName,
        contactID: cID
      }
    })

    await trx('contacts_relations').where({ contactableID: recordID, contactableType: this.tableName }).del()

    const result = await trx.raw(`${trx('contacts_relations').insert(contactsPayload).toQuery()} ON DUPLICATE KEY UPDATE contactID=contactID`)
    return result
  }

  async assignResponsible (id, responsibleID = null) {
    return this.table().where({ id }).update({ responsibleID })
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
