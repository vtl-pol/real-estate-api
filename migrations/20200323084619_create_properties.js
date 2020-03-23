const up = function (knex) {
  return knex.schema.createTable('properties', function (t) {
    t.increments('id')

    t.string('title').notNullable()
    t.integer('noOfRooms')
    t.integer('districtId')
    t.string('street')
    t.string('houseNo', 15)
    t.integer('price').notNullable()
    t.integer('material')
    t.integer('floors')
    t.integer('buildingType')
    t.integer('squareTotal')
    t.integer('squareLiving')
    t.integer('squareKitchen')
    t.integer('squareLand')
    t.string('registrationNo')
    t.boolean('renovated')
    t.boolean('garage')
    t.string('builtAt')
    t.text('description')
    t.string('type')

    t.timestamps()

    t.unique('registrationNo')
    t.index('districtId')
    t.index('material')
    t.index('buildingType')
    t.index('floors')
    t.index('squareTotal')
    t.index('squareLiving')
    t.index('squareKitchen')
    t.index('squareLand')
    t.index('renovated')
    t.index('type')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('properties')
}

module.exports = { up, down }
