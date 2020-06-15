
const up = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.dropColumn('districtID')
  })
}

const down = function (knex) {
  return knex.schema.table('buyers', function (t) {})
}

module.exports = { up, down }
