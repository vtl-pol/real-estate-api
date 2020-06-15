
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('districtId')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {})
}

module.exports = { up, down }
