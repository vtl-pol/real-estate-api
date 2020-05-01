
class BuyerService {
  constructor (buyerDAL, buyerResource) {
    this.buyerDAL = buyerDAL
    this.buyerResource = buyerResource
  }

  async getBuyers (req, res) {
    try {
      const currentPage = req.query.page || 1
      const perPage = 10
      const { buyers, pagination } = await this.buyerDAL.getBuyers({ currentPage, perPage })

      res.send({ success: true, buyers: buyers.map(b => this.buyerResource.brief(b)), pagination })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error })
    }
  }

  async getBuyer (req, res) {
    try {
      const buyer = await this.buyerDAL.find(req.params.id)
      if (buyer === null) {
        res.status(404).send({ success: false, error: 'Property not found' })
      }
      res.send({ success: true, buyer: this.buyerResource.full(buyer) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async createBuyer (req, res) {
    try {
      const payload = req.body
      payload.authorID = req.user.id

      const newBuyer = await this.buyerDAL.create(payload)
      res.send({ success: true, buyer: this.buyerResource.full(newBuyer) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async updateBuyer (req, res) {
    try {
      const id = req.params.id
      const payload = req.body

      const updated = await this.buyerDAL.update(id, payload)
      if (updated) {
        const buyer = await this.buyerDAL.find(id)
        res.send({ success: true, buyer: this.buyerResource.full(buyer) })
      } else {
        // No such record
        res.status(404).send({ success: false, error: `Запису #${id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async deleteBuyer (req, res) {
    try {
      const result = await this.buyerDAL.delete(req.params.id)
      if (result > 0) {
        res.send({ success: true })
      } else {
        // No record
        res.status(404).send({ success: false, error: `Запису #${req.params.id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }
}

module.exports = BuyerService
