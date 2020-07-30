require('dotenv').config()

const bcrypt = require('bcrypt')
const User = require('../components/user/user')

const seed = async function (knex) {
  if (process.env.NODE_ENV === 'development') {
    await knex('users').del()
  }

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(process.env.ADMIN_PASSWORD, 5, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  await knex('users').insert({
    fullName: 'Адміністратор',
    rank: User.RANKS.PROFESSIONAL.key,
    role: User.ROLES.ADMIN.key,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: '0931111111',
    email: 'admin@example.com',
    password: hashedPassword
  })

  if (process.env.NODE_ENV !== 'development') {
    return
  }

  await knex('users').insert({
    fullName: 'Агент',
    rank: User.RANKS.AGENT.key,
    role: User.ROLES.AGENT.key,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: '0932222222',
    email: 'agent@example.com',
    password: hashedPassword
  })

  await knex('users').insert({
    fullName: 'Офіс-Менеджер',
    rank: User.RANKS.AGENT.key,
    role: User.ROLES.MANAGER.key,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: '0973333333',
    email: 'manager@example.com',
    password: hashedPassword
  })

  await knex('users').insert({
    fullName: 'Гість',
    rank: null,
    role: User.ROLES.GUEST.key,
    isOfficial: false,
    isOnContract: false,
    attachmentId: null,
    phone: '0505555555',
    email: 'guest@example.com',
    password: hashedPassword
  })
}

module.exports = { seed }
