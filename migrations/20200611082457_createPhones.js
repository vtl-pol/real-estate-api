const up = function (knex) {
  return knex.schema.createTable('phones', function (t) {
    t.increments('id')
    t.integer('contactID').notNullable().unsigned().index().references('id').inTable('contacts').onDelete('CASCADE')
    t.string('phone').index()

    t.boolean('isOnViber').default(false)
    t.boolean('isOnTelegram').default(false)
    t.boolean('isOnFacebook').default(false)
    t.boolean('isOnWhatsapp').default(false)

    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    t.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

const down = function (knex) {
  return knex.schema.dropTable('phones')
}

module.exports = { up, down }
