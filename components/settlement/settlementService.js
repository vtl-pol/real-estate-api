class SettlementService {
  constructor (dal) {
    this.settlementDAL = dal
  }

  async list (_req, res) {
    const settlements = await this.settlementDAL.load()

    res.send({ settlements })
  }
}

module.exports = SettlementService
