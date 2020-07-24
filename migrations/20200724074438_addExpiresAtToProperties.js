
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.timestamp('expiresAt')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('expiresAt')
  })
}

module.exports = { up, down }
