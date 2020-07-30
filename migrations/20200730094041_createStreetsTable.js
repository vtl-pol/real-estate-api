const up = function (knex) {
  return knex.schema.createTable('streets', function (t) {
    t.string('name').index().unique()
  })
}

const down = function (knex) {
  return knex.schema.dropTable('streets')
}

module.exports = { up, down }
