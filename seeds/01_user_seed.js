require('dotenv').config()

const bcrypt = require('bcrypt')

const seed = async function (knex) {
  await knex('users').del()

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(process.env.ADMIN_PASSWORD, 5, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  await knex('users').insert({
    fullName: 'Адміністратор',
    rank: 3,
    role: 3,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: null,
    email: 'admin@example.com',
    password: hashedPassword
  })

  await knex('users').insert({
    fullName: 'Агент',
    rank: 1,
    role: 1,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: null,
    email: 'agent@example.com',
    password: hashedPassword
  })

  await knex('users').insert({
    fullName: 'Офіс-Менеджер',
    rank: 2,
    role: 2,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: null,
    email: 'manager@example.com',
    password: hashedPassword
  })

  await knex('users').insert({
    fullName: 'Гість',
    rank: null,
    role: 0,
    isOfficial: false,
    isOnContract: false,
    attachmentId: null,
    phone: null,
    email: 'guest@example.com',
    password: hashedPassword
  })
}

module.exports = { seed }
