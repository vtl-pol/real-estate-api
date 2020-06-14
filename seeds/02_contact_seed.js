const fixtures = require('./fixtures')
const { without } = require('../utils/object')

const seed = async function (knex) {
  await knex('contacts').del()

  for (const contact of fixtures.contacts) {
    const contactID = await knex('contacts').insert(without('phones', contact))

    const phones = contact.phones.map(p => Object.assign(p, { contactID }))
    await knex('phones').insert(phones)
  }

  return 'All ok'
}

module.exports = { seed }
