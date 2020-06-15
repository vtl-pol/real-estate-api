
const up = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.integer('districtID').index().unsigned().references('id').inTable('districts').onDelete('SET NULL')
  })
}

const down = function (knex) {
  return knex.schema.table('buyers', function (t) {})
}

module.exports = { up, down }
