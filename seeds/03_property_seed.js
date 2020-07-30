require('dotenv').config()

const moment = require('moment')
const fixtures = require('./fixtures')
const { arrayRandom } = require('../utils/array')

const calcMotivation = (motivation) => {
  if (motivation === 'C') {
    return moment().add(3, 'months').format()
  }

  if (motivation === 'B') {
    return moment().add(2, 'months').format()
  }

  if (motivation === 'A') {
    return moment().add(1, 'months').format()
  }

  if (motivation === 'AA') {
    return moment().format()
  }
}

const seed = async function (knex) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  await knex('properties').del()

  const user = await knex('users').limit(1)
  const authorID = user.id

  const contactsIDs = (await knex('contacts').select('id')).map(c => c.id)

  const settlements = await knex('settlements')
  const districts = await knex('districts')
  const streets = (await knex('streets')).map(s => s.name)

  const apartmentsPayload = fixtures.apartments.map(record => {
    const dist = arrayRandom(districts)
    return Object.assign(record, {
      authorID,
      type: 'apartment',
      districtID: dist.id,
      settlement: dist.settlement,
      street: arrayRandom(streets),
      expiresAt: calcMotivation(record.motivation)
    })
  })
  const housesPayload = fixtures.houses.map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      type: 'house',
      settlement: settlement,
      street: arrayRandom(streets),
      expiresAt: calcMotivation(record.motivation)
    })
  })
  const commercePayload = fixtures.commerce.map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      type: 'commerce',
      settlement: settlement,
      street: arrayRandom(streets),
      expiresAt: calcMotivation(record.motivation)
    })
  })

  await knex('properties').insert(apartmentsPayload)
  await knex('properties').insert(housesPayload)
  await knex('properties').insert(commercePayload)

  const properties = (await knex('properties').select('id')).map(p => {
    return {
      contactableID: p.id,
      contactableType: 'properties',
      contactID: arrayRandom(contactsIDs)
    }
  })

  await knex('contacts_relations').insert(properties)

  return 'All ok'
}

module.exports = { seed }
