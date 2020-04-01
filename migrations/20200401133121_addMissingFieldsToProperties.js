const up = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.integer('responsibleID').unsigned().index().references('id').inTable('users')
    t.integer('propertyStatus').default(0).index().unsigned()
    t.string('contract')
    t.string('motivation').index()
    t.integer('source').index().unsigned()
  })
}

const down = function (knex) {
  return knex.schema.table('properties', function (t) {
    t.dropForeign('responsibleID')
    t.dropColumn('responsibleID')
    t.dropColumn('propertyStatus')
    t.dropColumn('contract')
    t.dropColumn('motivation')
    t.dropColumn('source')
  })
}

module.exports = { up, down }
