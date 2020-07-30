const fixtures = require('./fixtures')
const { arrayRandom } = require('../utils/array')

const seed = async function (knex) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  await knex('buyers').del()

  const user = await knex('users').limit(1)
  const authorID = user.id

  const contactsIDs = (await knex('contacts').select('id')).map(c => c.id)

  const settlements = await knex('settlements')
  const districts = await knex('districts')

  const apartmentsPayload = fixtures.buyers.filter(r => r.lookingFor === 'apartment').map(record => {
    const dist = arrayRandom(districts)
    return Object.assign(record, {
      authorID,
      districtID: dist.id,
      settlement: dist.settlement
    })
  })
  const housesPayload = fixtures.buyers.filter(r => r.lookingFor === 'house').map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      settlement: settlement
    })
  })
  const commercePayload = fixtures.buyers.filter(r => r.lookingFor === 'commerce').map(record => {
    const settlement = arrayRandom(settlements).name
    return Object.assign(record, {
      authorID,
      settlement: settlement
    })
  })

  await knex('buyers').insert(apartmentsPayload)
  await knex('buyers').insert(housesPayload)
  await knex('buyers').insert(commercePayload)

  const buyers = (await knex('buyers').select('id')).map(p => {
    return {
      contactableID: p.id,
      contactableType: 'buyers',
      contactID: arrayRandom(contactsIDs)
    }
  })

  await knex('contacts_relations').insert(buyers)

  return 'All ok'
}

module.exports = { seed }
