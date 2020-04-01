const up = function (knex) {
  return knex.schema.createTable('photos', function (t) {
    t.increments('id')
    t.integer('propertyID').notNullable().unsigned().index().references('id').inTable('properties')
    t.string('filePath').notNullable()

    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    t.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

const down = function (knex) {
  return knex.schema.dropTable('photos')
}

module.exports = { up, down }
