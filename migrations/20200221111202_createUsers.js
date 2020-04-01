const up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')

    table.string('fullName', 255).notNullable()
    table.integer('rank').default(0)
    table.integer('role').nullable()
    table.boolean('isOnContract').default(false)
    table.boolean('isOfficial').default(false)
    table.integer('attachmentId').nullable()
    table.integer('phone').nullable()
    table.string('email', 255).notNullable()
    table.string('password', 255).notNullable()

    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

    /**  INDEXES **/
    table.unique('email')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('users')
}

module.exports = { up, down }
