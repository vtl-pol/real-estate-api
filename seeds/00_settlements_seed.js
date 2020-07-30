require('dotenv').config()

const { settlements, streets } = require('./fixtures')

const seed = async function (knex) {
  await knex('settlements').del()
  await knex('districts').del()
  await knex('streets').del()

  for (const settlement of settlements) {
    const name = settlement.name
    await knex('settlements').insert({ name })

    if (settlement.districts.length) {
      await knex('districts').insert(settlement.districts.map(dist => {
        return { name: dist, settlement: settlement.name }
      }))
    }
  }
  const strPayload = streets.map(s => Object({ name: s }))

  await knex('streets').insert(strPayload)
}

module.exports = { seed }
