const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.integer('aptNo').unsigned().nullable()
    t.integer('floor').unsigned().nullable()
    t.boolean('autonomousHeat').default(false).index()
    t.string('ownerName')
    t.integer('ownerPhone').unsigned()
    t.timestamp('ownerBirthday')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('aptNo')
    t.dropColumn('floor')
    t.dropColumn('autonomousHeat')
    t.dropColumn('ownerName')
    t.dropColumn('ownerPhone')
    t.dropColumn('ownerBirthday')
  })
}

module.exports = { up, down }
