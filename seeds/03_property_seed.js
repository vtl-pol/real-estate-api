const fixtures = require('./fixtures')
const { arrayRandom } = require('../utils/array')

const seed = async function (knex) {
  await knex('properties').del()

  const user = await knex('users').limit(1)
  const authorID = user.id

  const contactsIDs = (await knex('contacts').select('id')).map(c => c.id)

  const settlements = await knex('settlements')
  const districts = await knex('districts')

  const apartmentsPayload = fixtures.apartments.map(record => {
    const dist = arrayRandom(districts)
    return Object.assign(record, {
      authorID,
      type: 'apartment',
      districtID: dist.id,
      settlement: dist.settlement
    })
  })
  const housesPayload = fixtures.houses.map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      type: 'house',
      settlement: settlement
    })
  })
  const commercePayload = fixtures.commerce.map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      type: 'commerce',
      settlement: settlement
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
