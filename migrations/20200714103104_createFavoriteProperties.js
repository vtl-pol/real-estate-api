const up = function (knex) {
  return knex.schema.createTable('favorite_properties', function (t) {
    t.integer('userID').notNullable().unsigned().index().references('id').inTable('users').onDelete('CASCADE')
    t.integer('propertyID').notNullable().unsigned().index().references('id').inTable('properties').onDelete('CASCADE')

    t.unique(['userID', 'propertyID'], 'property_fav_unique')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('favorite_properties')
}

module.exports = { up, down }
