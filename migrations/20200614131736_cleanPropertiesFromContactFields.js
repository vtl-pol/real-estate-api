const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('ownerName')
    t.dropColumn('ownerPhone')
    t.dropColumn('ownerBirthday')
    t.dropColumn('isOnViber')
    t.dropColumn('isOnTelegram')
    t.dropColumn('isOnFacebook')
    t.dropColumn('isOnWhatsapp')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.string('ownerName')
    t.integer('ownerPhone').unsigned()
    t.timestamp('ownerBirthday')
    t.boolean('isOnViber').default(false)
    t.boolean('isOnTelegram').default(false)
    t.boolean('isOnFacebook').default(false)
    t.boolean('isOnWhatsapp').default(false)
  })
}

module.exports = { up, down }
