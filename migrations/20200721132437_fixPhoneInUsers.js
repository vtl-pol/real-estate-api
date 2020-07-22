
const up = function (knex) {
  return knex.schema.alterTable('users', function (t) {
    t.string('phone').index().alter()
  })
}

const down = function (knex) {
  return knex.schema.alterTable('users', function (t) {
    t.string('phone').index().alter()
  })
}

module.exports = { up, down }
