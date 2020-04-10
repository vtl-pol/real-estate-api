
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.string('reasonToSell').default('')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('reasonToSell')
  })
}

module.exports = { up, down }
