const moment = require('moment')
const { db } = require('../../config')
const { without } = require('../../utils/object')

class BuyerDAL {
  constructor (table, propType, BuyerModel) {
    this.tableName = table
    this.lookingFor = propType
    this.BuyerModel = BuyerModel
    this.archiveMode = false
  }

  setArchiveMode () {
    this.archiveMode = true
  }

  table () {
    if (this.archiveMode) {
      return db(this.tableName).where({ lookingFor: this.lookingFor })
        .whereNot({ archivedAt: null })
    }
    return db(this.tableName).where({ lookingFor: this.lookingFor, archivedAt: null })
  }

  async filterAndLoad ({ currentPage, perPage }) {
    const { data, pagination } = await this.table()
      .leftJoin('users', 'buyers.authorID', '=', 'users.id')
      .select('buyers.*', 'users.fullName AS authorName')
      .paginate({ perPage, currentPage })

    const contacts = await this.loadContactsFor(data.map(r => r.id))

    const records = data.map(r => {
      Object.assign(r, { contacts: contacts.filter(c => c.contactableID === r.id) })
      return new this.BuyerModel(r)
    })

    return { records, pagination }
  }

  async find (id) {
    const buyer = await this.table().where({ id, lookingFor: this.lookingFor }).first()
    if (!buyer) {
      return null
    }

    const contacts = await this.loadContactsFor([buyer.id])

    Object.assign(buyer, { contacts: contacts.filter(c => c.contactableID === buyer.id) })

    return new this.BuyerModel(buyer)
  }

  async loadContactsFor (buyerIDs) {
    const contacts = await db('contacts')
      .join('contacts_relations', 'contacts.id', '=', 'contacts_relations.contactID')
      .where('contacts_relations.contactableID', 'IN', buyerIDs)
      .where('contacts_relations.contactableType', this.tableName)
      .select('contacts.*', 'contacts_relations.contactableID')

    const phones = await db('phones').where('contactID', 'IN', contacts.map(c => c.id))

    contacts.map(r => {
      return Object.assign(r, { phones: phones.filter(p => p.contactID === r.id) })
    })

    return contacts
  }

  async create (payload) {
    payload.lookingFor = this.lookingFor
    try {
      const buyerID = await db.transaction(async trx => {
        const buyerID = await trx(this.tableName).insert(without(['contactsIDs'], payload))
        if (payload.contactsIDs.length) {
          await this.syncContacts(buyerID, payload.contactsIDs, trx)
        }

        return buyerID
      })
      const buyer = await this.find(buyerID)

      return buyer
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async update (id, payload) {
    const result = await this.table().update(without(['contactsIDs'], payload)).where({ id })

    if (payload.contactsIDs.length) {
      await this.syncContacts(id, payload.contactsIDs)
    }

    return result
  }

  async syncContacts (recordID, contactsIDs, trx) {
    if (trx === undefined) { trx = db }

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

  async archive (id, payload) {
    return this.table().where({ id }).update({
      archivedAt: moment().format(),
      archivedReason: payload.archivedReason,
      archivedTill: (payload.archivedTill || null),
      soldBy: (payload.soldBy || null)
    })
  }

  async restoreFromArchive (id) {
    return this.table().where({ id }).update({
      archivedAt: null,
      archivedReason: null,
      archivedTill: null,
      soldBy: null
    })
  }

  async delete (id) {
    return this.table().where({ id, lookingFor: this.lookingFor }).del()
  }
}

module.exports = BuyerDAL
