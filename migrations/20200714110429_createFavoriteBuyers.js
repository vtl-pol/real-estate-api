const up = function (knex) {
  return knex.schema.createTable('favorite_buyers', function (t) {
    t.integer('userID').notNullable().unsigned().index().references('id').inTable('users').onDelete('CASCADE')
    t.integer('buyerID').notNullable().unsigned().index().references('id').inTable('buyers').onDelete('CASCADE')

    t.unique(['userID', 'buyerID'], 'property_buy_unique')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('favorite_buyers')
}

module.exports = { up, down }
