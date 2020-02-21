const up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')

    table.string('full_name', 255).notNullable()
    table.integer('rank').default(0)
    table.integer('role').nullable()
    table.boolean('is_on_contract').default(false)
    table.boolean('is_official').default(false)
    table.integer('attachment_id').nullable()
    table.integer('phone').nullable()
    table.string('email', 255).notNullable()
    table.string('password', 255).notNullable()

    table.timestamps()

    /**  INDEXES **/
    table.unique('email')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('users')
}

module.exports = { up, down }
