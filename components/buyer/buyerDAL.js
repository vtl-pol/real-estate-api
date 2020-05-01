const moment = require('moment')
const { db } = require('../../config')

class BuyerDAL {
  constructor (table, propType, BuyerModel) {
    this.tableName = table
    this.lookingFor = propType
    this.BuyerModel = BuyerModel
  }

  table () {
    return db(this.tableName).where({ lookingFor: this.lookingFor })
  }

  async getBuyers ({ currentPage, perPage }) {
    const { data, pagination } = await this.table()
      .leftJoin('users', 'buyers.authorID', '=', 'users.id')
      .select('buyers.*', 'users.fullName AS authorName')
      .paginate({ perPage, currentPage })

    const buyers = data.map(r => new this.BuyerModel(r))

    return { buyers, pagination }
  }

  async find (id) {
    const buyer = await this.table().where({ id, lookingFor: this.lookingFor }).first()
    if (!buyer) {
      return null
    }
    return new this.BuyerModel(buyer)
  }

  async create (payload) {
    payload.lookingFor = this.lookingFor
    const buyerID = await db(this.tableName).insert(payload)
    const buyer = await this.find(buyerID)

    return buyer
  }

  async update (id, payload) {
    if (payload.birthday) {
      payload.birthday = moment(payload.birthday, 'DD-MM-YYYY').format()
    }
    const result = await this.table().update(payload).where({ id })
    return result
  }

  async delete (id) {
    return this.table().where({ id, lookingFor: this.lookingFor }).del()
  }
}

module.exports = BuyerDAL
