const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.integer('authorID').unsigned().index().references('id').inTable('users')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropForeign('authorID')
    t.dropColumn('authorID')
  })
}

module.exports = { up, down }
