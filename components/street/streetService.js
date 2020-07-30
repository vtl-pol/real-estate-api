class StreetService {
  constructor (dal) {
    this.streetDAL = dal
  }

  async list (_req, res) {
    const streets = await this.streetDAL.load()

    res.send({ streets })
  }
}

module.exports = StreetService
