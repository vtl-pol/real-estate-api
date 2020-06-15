
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.integer('districtID').index().unsigned().references('id').inTable('districts').onDelete('SET NULL')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {})
}

module.exports = { up, down }
