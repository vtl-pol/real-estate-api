require('dotenv').config()
const { userService } = require('../components/user')

const seed = function () {
  return userService.reqisterUser({
    fullName: 'Адміністратор',
    rank: 3,
    role: 0,
    isOnContract: true,
    isOfficial: true,
    attachmentId: null,
    phone: null,
    email: 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD
  })
    .then(r => console.log(r))
}

module.exports = { seed }
