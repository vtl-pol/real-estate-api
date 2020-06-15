
const up = function (knex) {
  return knex.schema.alterTable("properties", function (t) {
    t.integer('propertyStatus').default(1).unsigned().alter()
  })
}

const down = function (knex) {
  return knex.schema.alterTable("properties", function (t) {
    t.integer('propertyStatus').default(0).unsigned().alter()
  })
}

module.exports = { up, down }
