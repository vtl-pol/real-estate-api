const up = function (knex) {
  return knex.schema.createTable('districts', function (t) {
    t.increments('id')
    t.string('settlement').index().references('name').inTable('settlements').onDelete('CASCADE')
    t.string('name')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('districts')
}

module.exports = { up, down }
