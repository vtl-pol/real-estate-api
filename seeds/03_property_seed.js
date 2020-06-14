const fixtures = require('./fixtures')

const seed = async function (knex) {
  await knex('properties').del()

  const user = await knex('users').limit(1)
  const authorID = user.id

  const contactsIDs = (await knex('contacts').select('id')).map(c => c.id)

  await knex('properties').insert(fixtures.apartments.map(r => Object.assign(r, { authorID, type: 'apartment' })))
  await knex('properties').insert(fixtures.houses.map(r => Object.assign(r, { authorID, type: 'house' })))
  await knex('properties').insert(fixtures.commerce.map(r => Object.assign(r, { authorID, type: 'commerce' })))

  const properties = (await knex('properties').select('id')).map(p => {
    return {
      contactableID: p.id,
      contactableType: 'properties',
      contactID: contactsIDs[Math.floor(Math.random() * contactsIDs.length)]
    }
  })

  await knex('contacts_relations').insert(properties)

  return 'All ok'
}

module.exports = { seed }
