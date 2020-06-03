const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.timestamp('archivedAt').index()
    t.timestamp('archivedTill')
    t.integer('archivedReason').unsigned().index()
    t.integer('soldByID').unsigned().index().references('id').inTable('users').onDelete('SET NULL')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('archivedAt')
    t.dropColumn('archivedTill')
    t.dropColumn('archivedReason')
    t.dropForeign('soldByID')
    t.dropColumn('soldByID')
  })
}

module.exports = { up, down }
