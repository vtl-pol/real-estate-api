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

  return knex('users').insert({
    fullName: 'Адміністратор',
    rank: 3,
    role: 0,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: null,
    email: 'admin@admin.com',
    password: hashedPassword
  })
}

module.exports = { seed }
