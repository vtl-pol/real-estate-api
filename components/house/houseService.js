const House = require('./house')
const houseResource = require('./resource')
const { photoService } = require('../photo')

class HouseService {
  async getHouses (req, res) {
    try {
      const houseQuery = House.withPagination(req.query.page, 10)
      const result = await House.filter(houseQuery, req.query.filter)
      const { data, pagination } = result

      res.send({ success: true, houses: data.map(h => houseResource.brief(h)), pagination })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async getHouse (req, res) {
    try {
      const house = await House.find(req.params.id)

      res.send({ success: true, house })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async createHouse (req, res) {
    try {
      const payload = req.body
      payload.type = 'House'

      const result = await House.create(payload)
      if (req.body.photos && req.body.photos.length) {
        photoService.uploadPhotos(req, res, async (result) => {
          res.status(result.error ? 422 : 200).send({
            success: true,
            house: houseResource.full(await House.find(result)),
            error: result.error
          })
        })
      } else {
        res.send({ success: true, house: houseResource.full(await House.find(result)) })
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

      const updated = await House.update(id, payload)
      if (updated) {
        res.send({ success: true, house: (await House.find(id)) })
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
      const result = await House.delete(req.params.id)
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
