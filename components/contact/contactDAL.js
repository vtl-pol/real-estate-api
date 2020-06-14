const { db } = require('../../config')
const { without } = require('../../utils/object')
const Contact = require('./contact')

class ContactDAL {
  constructor (table) {
    this.tableName = table
  }

  table () {
    return db(this.tableName)
  }

  async load ({ perPage, currentPage }) {
    const { data, pagination } = await this.table().paginate({ perPage, currentPage })
    const phonesData = await this.loadPhones(data.map(r => r.id))

    const contacts = this.assignPhonesData(data, phonesData).map(r => new Contact(r))

    return { contacts, pagination }
  }

  async find (id) {
    const contact = await this.table().where({ id }).first()
    if (!contact) {
      return null
    }
    contact.phones = (await this.loadPhones(contact.id))
    return new Contact(contact)
  }

  async create (payload) {
    const contactID = await db.transaction(async (trx) => {
      const contactID = await trx(this.tableName).insert(without(['phones'], payload))

      if (payload.phones && payload.phones.length) {
        const phonesPayload = payload.phones.map(phone => {
          return {
            contactID,
            phone: phone.phone,
            isOnViber: (phone.isOnViber || false),
            isOnTelegram: (phone.isOnTelegram || false),
            isOnFacebook: (phone.isOnFacebook || false),
            isOnWhatsapp: (phone.isOnWhatsapp || false)
          }
        })

        await trx('phones').insert(phonesPayload)
      }
      return contactID
    })

    const contact = await this.find(contactID[0])
    return contact
  }

  async update (id, payload) {
    await db.transaction(async (trx) => {
      const contactPayload = without(['phones'], payload)
      if (Object.keys(contactPayload).length > 0) {
        const result = await trx(this.tableName).where({ id }).update(contactPayload)
        if (!result) {
          return false
        }
      }
      const updatePhones = payload.phones.filter(ph => (ph.id !== undefined && ph.id !== null))
      const newPhones = payload.phones.filter(ph => (ph.id === undefined || ph.id === null))
        .map(ph => Object.assign(ph, { contactID: id }))

      let phoneResult = false
      for (const updatePayload of updatePhones) {
        phoneResult = await trx('phones').where({ contactID: id, id: updatePayload.id }).update(without(['id'], updatePayload))
        if (!phoneResult) {
          return false
        }
      }

      phoneResult = await trx('phones').insert(newPhones)

      if (!phoneResult) {
        return false
      }
    })

    const contact = await this.find(id)
    return contact
  }

  assignPhonesData (contacts, phonesData) {
    return contacts.map(r => {
      return Object.assign(r, { phones: phonesData.filter(p => p.contactID === r.id) })
    })
  }

  async searchByPhone (query) {
    query = query.replace(/\D/g, '')
    const phones = await db('phones')
      .where('phone', 'like', `%${query}%`)

    if (!phones.length) {
      return []
    }
    const result = await this.table().whereIn('id', phones.map(r => r.contactID)).limit(5)

    return this.assignPhonesData(result, phones).map(r => new Contact(r))
  }

  async searchByName (query) {
    const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1)
    const lowercasedQuery = query.toLowerCase()
    const result = await this.table()
      .where('name', 'like', `%${query}%`)
      .orWhere('name', 'like', `%${lowercasedQuery}%`)
      .orWhere('name', 'like', `%${capitalizedQuery}%`)
      .limit(5)

    if (!result.length) {
      return []
    }

    const phonesData = await db('phones').where('contactID', 'IN', result.map(r => r.id))

    return this.assignPhonesData(result, phonesData).map(r => new Contact(r))
  }

  async loadPhones (contactID) {
    if (!Array.isArray(contactID)) {
      contactID = [contactID]
    }

    return db('phones').where('contactID', 'IN', contactID)
  }

  async exist (contactsIDs) {
    const result = await this.table().count('id AS length').where('id', 'IN', contactsIDs).first()
    return (result.length === contactsIDs.length)
  }
}

module.exports = ContactDAL
