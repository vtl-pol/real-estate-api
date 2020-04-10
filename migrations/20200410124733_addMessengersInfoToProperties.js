
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.boolean('isOnViber').default(false)
    t.boolean('isOnTelegram').default(false)
    t.boolean('isOnFacebook').default(false)
    t.boolean('isOnWhatsapp').default(false)
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('isOnViber')
    t.dropColumn('isOnTelegram')
    t.dropColumn('isOnFacebook')
    t.dropColumn('isOnWhatsapp')
  })
}

module.exports = { up, down }
