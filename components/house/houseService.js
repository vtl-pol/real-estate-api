const houseDAL = require('./houseDAL')
const houseResource = require('./houseResource')
const { photoService } = require('../photo')

class HouseService {
  async getHouses (req, res) {
    try {
      const filter = req.query.filter || {}
      const currentPage = req.query.page || 1
      const perPage = 10
      const { houses, pagination } = await houseDAL.filterAndLoad({ filter, currentPage, perPage })

      res.send({ success: true, houses: houses.map(h => houseResource.brief(h)), pagination })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async getHouse (req, res) {
    try {
      const house = await houseDAL.find(req.params.id)

      res.send({ success: true, house: houseResource.full(house) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async createHouse (req, res) {
    try {
      const payload = req.body
      payload.authorID = req.user.id
      console.log(req.user)
      const newHouse = await houseDAL.create(payload)
      if (req.body.photos && req.body.photos.length) {
        photoService.uploadPhotos(req, res, async (status) => {
          res.status(status.error ? 422 : 200).send({
            success: true,
            house: houseResource.full(newHouse),
            error: status.error
          })
        })
      } else {
        res.send({ success: true, house: houseResource.full(newHouse) })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async updateHouse (req, res) {
    try {
      const id = req.params.id
      const payload = req.body

      const updated = await houseDAL.update(id, payload)
      if (updated) {
        res.send({ success: true, house: (await houseDAL.find(id)) })
      } else {
        // No such record
        res.status(404).send({ success: false, error: `Запису #${id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async uploadPhotos (req, res) {
    photoService.uploadPhotos(req, res, (result) => {
      res.status(result.error ? 422 : 200).send(result)
    })
  }

  async deleteHouse (req, res) {
    try {
      const result = await houseDAL.delete(req.params.id)
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

module.exports = new HouseService()
