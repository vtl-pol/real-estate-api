
const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.integer('featuredPhotoNo').unsigned()
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropColumn('featuredPhotoNo')
  })
}

module.exports = { up, down }
