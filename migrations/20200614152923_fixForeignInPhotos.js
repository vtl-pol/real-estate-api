
const up = function (knex) {
  return knex.schema.table('photos', (t) => {
    t.dropForeign('propertyID')

    t.integer('propertyID').notNullable().unsigned().index().references('id').inTable('properties').onDelete('CASCADE')
  })
}

const down = function (knex) {
  return knex.schema.table('photos', (t) => {
    t.dropForeign('propertyID')

    t.integer('propertyID').notNullable().unsigned().index().references('id').inTable('properties')
  })
}

module.exports = { up, down }
