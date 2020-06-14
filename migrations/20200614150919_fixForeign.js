
const up = function (knex) {
  return knex.schema.table('properties', (t) => {
    t.dropForeign('authorID')

    t.foreign('authorID').references('id').inTable('users').onDelete('SET NULL')
  })
}

const down = function (knex) {
  return knex.schema.table('properties', (t) => {
    t.dropForeign('authorID')

    t.foreign('authorID').references('id').inTable('users')
  })
}

module.exports = { up, down }
