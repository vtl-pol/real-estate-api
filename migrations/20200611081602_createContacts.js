const up = function (knex) {
  return knex.schema.createTable('contacts', function (t) {
    t.increments('id')
    t.string('name')
    t.timestamp('birthday')
    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    t.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

const down = function (knex) {
  return knex.schema.dropTable('contacts')
}

module.exports = { up, down }
