const up = function (knex) {
  return knex.schema.createTable('settlements', function (t) {
    t.string('name').index().unique()
  })
}

const down = function (knex) {
  return knex.schema.dropTable('settlements')
}

module.exports = { up, down }
