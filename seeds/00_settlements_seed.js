require('dotenv').config()

const { settlements } = require('./fixtures')

const seed = async function (knex) {
  await knex('settlements').del()

  for (const settlement of settlements) {
    const name = settlement.name
    await knex('settlements').insert({ name })

    if (settlement.districts.length) {
      await knex('districts').insert(settlement.districts.map(dist => {
        return { name: dist, settlement: settlement.name }
      }))
    }
  }
}

module.exports = { seed }
