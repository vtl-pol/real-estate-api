const up = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.dropColumn('phone')
    t.dropColumn('birthday')
    t.dropColumn('isOnViber')
    t.dropColumn('isOnTelegram')
    t.dropColumn('isOnFacebook')
    t.dropColumn('isOnWhatsapp')
  })
}

const down = function (knex) {
  return knex.schema.table('buyers', function (t) {
    t.integer('phone').unsigned()
    t.timestamp('birthday')
    t.boolean('isOnViber').default(false)
    t.boolean('isOnTelegram').default(false)
    t.boolean('isOnFacebook').default(false)
    t.boolean('isOnWhatsapp').default(false)
  })
}

module.exports = { up, down }
