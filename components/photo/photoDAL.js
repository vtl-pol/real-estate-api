const fs = require('fs')
const { db } = require('../../config')
const Photo = require('./photo')

class PhotoDAL {
  constructor (table) {
    this.table = table
  }

  async find (id) {
    const photo = await db(this.table).where({ id }).first()
    return new Photo(photo)
  }

  async create (payload) {
    const newID = await db(this.table).insert(payload)
    return this.find(newID)
  }

  async delete (id) {
    const photo = await this.find(id)

    // It's a false positive.
    // We are in control of a filename in here and it can't be set by a user input
    /* eslint-disable security/detect-non-literal-fs-filename */
    fs.unlinkSync(`./${photo.filePath}`)
    return db(this.table).where({ id }).del()
  }
}

module.exports = new PhotoDAL('photos')
