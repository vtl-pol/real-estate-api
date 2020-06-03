const up = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.timestamp('archivedAt').index()
    t.timestamp('archivedTill')
    t.integer('archivedReason').unsigned().index()
    t.integer('soldBy').unsigned().index()
  })
}

const down = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.dropColumn('archivedAt')
    t.dropColumn('archivedTill')
    t.dropColumn('archivedReason')
    t.dropColumn('soldBy')
  })
}

module.exports = { up, down }
