const { photoService, photoDAL } = require('../photo')

class PropertyService {
  constructor (propertyDAL, propertyResource) {
    this.propertyDAL = propertyDAL
    this.propertyResource = propertyResource
  }

  async getProperties (req, res) {
    try {
      const filter = req.query.filter || {}
      const currentPage = req.query.page || 1
      const perPage = req.query.perPage || 16
      const { records, pagination } = await this.propertyDAL.filterAndLoad({ filter, currentPage, perPage })

      res.send({ success: true, properties: records.map(h => this.propertyResource.full(h)), pagination })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async getProperty (req, res) {
    try {
      const property = await this.propertyDAL.find(req.params.id)
      if (property === null) {
        res.status(404).send({ success: false, error: 'Об`єкту не існує' })
      }
      res.send({ success: true, property: this.propertyResource.full(property) })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async createProperty (req, res) {
    try {
      const payload = req.body
      payload.authorID = req.user.id

      const newProperty = await this.propertyDAL.create(payload)
      if (req.body.photos && req.body.photos.length) {
        photoService.uploadPhotos(req, res, async (status) => {
          res.status(status.error ? 422 : 200).send({
            success: true,
            property: this.propertyResource.full(newProperty),
            error: status.error
          })
        })
      } else {
        res.send({ success: true, property: this.propertyResource.full(newProperty) })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async updateProperty (req, res) {
    try {
      const id = req.params.id
      const payload = req.body

      const updated = await this.propertyDAL.update(id, payload)
      if (updated) {
        const newProperty = await this.propertyDAL.find(id)
        res.send({ success: true, property: this.propertyResource.full(newProperty) })
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

  async deletePhoto (req, res) {
    const id = req.params.id
    const propertyID = req.params.propertyID
    const photo = await photoDAL.findBy({ id, propertyID })
    if (photo.id !== undefined) {
      await photoDAL.delete(photo.id)
      res.send({
        success: true,
        photo
      })
    } else {
      res.status(404).send({
        error: 'Фото не знайдено'
      })
    }
  }

  async archiveProperty (req, res) {
    try {
      const payload = req.body
      const result = await this.propertyDAL.archive(req.params.id, payload)
      if (result) {
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

module.exports = PropertyService
