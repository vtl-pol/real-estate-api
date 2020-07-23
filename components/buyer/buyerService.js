class BuyerService {
  constructor (buyerDAL, buyerResource) {
    this.buyerDAL = buyerDAL
    this.buyerResource = buyerResource
  }

  async getBuyers (req, res) {
    this.buyerDAL.setCurrentUser(req.user.id)
    try {
      const currentPage = req.query.page || 1
      const perPage = 10
      const filter = req.query.filter || {}
      const sortBy = req.query.sortBy

      const { records, pagination } = await this.buyerDAL.filterAndLoad({ filter, currentPage, perPage, sortBy })

      res.send({
        success: true,
        buyers: records.map(b => {
          b.restrictFor(req.user)
          return this.buyerResource.full(b)
        }),
        pagination
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error })
    }
  }

  async getBuyer (req, res) {
    this.buyerDAL.setCurrentUser(req.user.id)
    try {
      const buyer = await this.buyerDAL.find(req.params.id)
      if (buyer === null) {
        return res.status(404).send({ success: false, error: 'Покупця не існує' })
      }
      buyer.restrictFor(req.user)
      res.send({ success: true, buyer: this.buyerResource.full(buyer) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async createBuyer (req, res) {
    this.buyerDAL.setCurrentUser(req.user.id)
    try {
      const payload = req.body
      payload.authorID = req.user.id
      payload.responsibleID = req.user.id

      const newBuyer = await this.buyerDAL.create(payload)
      res.send({ success: true, buyer: this.buyerResource.full(newBuyer) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async updateBuyer (req, res) {
    this.buyerDAL.setCurrentUser(req.user.id)
    try {
      const id = req.params.id
      const payload = req.body
      const buyer = await this.buyerDAL.findBasic(id)

      if (buyer) {
        if (!buyer.editableBy(req.user)) {
          return res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
        }

        await this.buyerDAL.update(id, payload)
        const updatedBuyer = await this.buyerDAL.find(id)
        updatedBuyer.restrictFor(req.user)
        res.send({ success: true, buyer: this.buyerResource.full(updatedBuyer) })
      } else {
        // No such record
        res.status(404).send({ success: false, error: `Запису #${id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async archiveBuyer (req, res) {
    try {
      const id = req.params.id
      const payload = req.body
      const buyer = await this.buyerDAL.findBasic(id)

      if (buyer) {
        if (!buyer.editableBy(req.user)) {
          return res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
        }

        await this.buyerDAL.archive(req.params.id, payload)
        res.send({ success: true })
      } else {
        res.status(404).send({ success: false, error: `Запису #${req.params.id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async saveToFavorites (req, res) {
    const propertyID = req.params.id
    const userID = req.user.id

    try {
      await this.buyerDAL.saveToFavorites(propertyID, userID)
      res.send({ success: true })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error: error.message })
    }
  }

  async removeFromFavorites (req, res) {
    const propertyID = req.params.id
    const userID = req.user.id

    try {
      await this.buyerDAL.removeFromFavorites(propertyID, userID)
      res.send({ success: true })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error: error.message })
    }
  }

  async getFavorites (req, res) {
    const userID = req.user.id
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 16

    try {
      const { records, pagination } = await this.buyerDAL.getFavorites(userID, currentPage, perPage)
      res.send({ favorites: records, pagination })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error: error.message })
    }
  }
}

module.exports = BuyerService
