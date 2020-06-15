
const up = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.string('settlement').index().references('name').inTable('settlements').onDelete('SET NULL')
  })
}

const down = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.dropColumn('settlement')
  })
}

module.exports = { up, down }
