const up = function (knex) {
  return knex.schema.createTable('photos', function (t) {
    t.increments('id')
    t.integer('propertyId').notNullable()
    t.string('filePath').notNullable()

    t.timestamps()

    t.index('propertyId')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('photos')
}

module.exports = { up, down }
