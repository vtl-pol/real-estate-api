
const up = function (knex) {
  return knex.schema.createTable('buyers', function (t) {
    t.increments('id')
    t.string('lookingFor').notNullable()
    t.string('name').notNullable()
    t.integer('phone').unsigned()
    t.timestamp('birthday')
    t.boolean('isOnViber').default(false)
    t.boolean('isOnTelegram').default(false)
    t.boolean('isOnFacebook').default(false)
    t.boolean('isOnWhatsapp').default(false)
    t.integer('authorID').unsigned().index().references('id').inTable('users').onDelete('SET NULL')
    t.integer('responsibleID').unsigned().index().references('id').inTable('users').onDelete('SET NULL')
    t.integer('buyerStatus').unsigned().index()
    t.string('contract').index()
    t.string('motivation').index()
    t.string('source').index()
    t.boolean('autonomousHeat')
    t.text('reasonToBuy')
    t.text('description')
    t.integer('noOfRooms').unsigned()
    t.integer('districtID').unsigned().index()
    t.integer('maxPrice').unsigned()
    t.integer('material').unsigned()
    t.integer('buildingType').unsigned()
    t.integer('floor')
    t.boolean('isRenovated')
    t.integer('range').unsigned().index()
    t.integer('squareTotal').unsigned()
    t.integer('squareLand').unsigned()
    t.boolean('hasGarage')
    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    t.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

const down = function (knex) {
  return knex.schema.dropTable('buyers')
}

module.exports = { up, down }
