
const up = function (knex) {
  return knex.schema.createTable('contacts_relations', function (t) {
    t.integer('contactableID').notNullable().unsigned().index()
    t.string('contactableType').notNullable().index()
    t.integer('contactID').notNullable().unsigned().index().references('id').inTable('contacts').onDelete('CASCADE')

    t.unique(['contactID', 'contactableID', 'contactableType'], 'contact_relation_unique')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('contacts_relations')
}

module.exports = { up, down }
