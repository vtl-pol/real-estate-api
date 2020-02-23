const up = function (knex) {
  return knex.schema.table('users', function (t) {
    t.string('accessToken').nullable()
    t.datetime('tokenIssuedAt')
  })
}

const down = function (knex) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('accessToken')
    t.dropColumn('tokenIssuedAt')
  })
}

module.exports = { up, down }
