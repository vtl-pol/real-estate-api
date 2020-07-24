require('dotenv').config()
const moment = require('moment')
const schedule = require('node-schedule')
const { db } = require('./config')

/**
 * Motivations Sync
 */
schedule.scheduleJob('0 */12 * * *', async () => {
  await db('properties')
    .where('archivedAt', null)
    .where('motivation', 'A')
    .where('expiresAt', '<=', moment().format())
    .update({
      motivation: 'AA'
    })

  await db('properties')
    .where('archivedAt', null)
    .where('motivation', 'B')
    .where('expiresAt', '<=', moment().format())
    .update({
      motivation: 'A',
      expiresAt: moment().add(1, 'months').format()
    })

  await db('properties')
    .where('archivedAt', null)
    .where('motivation', 'C')
    .where('expiresAt', '<=', moment().format())
    .update({
      motivation: 'B',
      expiresAt: moment().add(2, 'months').format()
    })
})
