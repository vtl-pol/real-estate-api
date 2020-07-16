const { photoService, photoDAL } = require('../photo')

class PropertyService {
  constructor (propertyDAL, propertyResource) {
    this.propertyDAL = propertyDAL
    this.propertyResource = propertyResource
  }

  async getProperties (req, res) {
    this.propertyDAL.setCurrentUser(req.user.id)
    try {
      const filter = req.query.filter || {}
      const currentPage = req.query.page || 1
      const perPage = req.query.perPage || 16
      const sortBy = req.query.sortBy

      const { records, pagination } = await this.propertyDAL.filterAndLoad({ filter, currentPage, perPage, sortBy })

      res.send({
        success: true,
        properties: records.map(h => {
          h.restrictFor(req.user)
          return this.propertyResource.full(h)
        }),
        pagination
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

  async getProperty (req, res) {
    this.propertyDAL.setCurrentUser(req.user.id)
    try {
      const property = await this.propertyDAL.find(req.params.id, req.user.id)
      if (property === null) {
        return res.status(404).send({ success: false, error: 'Об`єкту не існує' })
      }
      property.restrictFor(req.user)
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
      payload.responsibleID = req.user.id

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
    this.propertyDAL.setCurrentUser(req.user.id)
    try {
      const id = req.params.id
      const payload = req.body
      const property = await this.propertyDAL.findBasic(id)

      if (property) {
        if (!property.editableBy(req.user)) {
          res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
          return
        }

        await this.propertyDAL.update(id, payload)
        const newProperty = await this.propertyDAL.find(id)
        newProperty.restrictFor(req.user)

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
    const property = await this.propertyDAL.findBasic(req.params.id)

    if (property) {
      if (!property.editableBy(req.user)) {
        res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
        return
      }
      photoService.uploadPhotos(req, res, (result) => {
        res.status(result.error ? 422 : 200).send(result)
      })
    } else {
      res.status(404).send({ success: false, error: `Запису #${req.params.id} не існує` })
    }
  }

  async deletePhoto (req, res) {
    const id = req.params.id
    const propertyID = req.params.propertyID
    const property = await this.propertyDAL.findBasic(id)

    if (property) {
      if (!property.editableBy(req.user)) {
        res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
        return
      }

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
  }

  async archiveProperty (req, res) {
    try {
      const id = req.params.id
      const payload = req.body

      const property = await this.propertyDAL.findBasic(id)
      if (property) {
        if (!property.editableBy(req.user)) {
          res.status(403).send({ message: 'У вас немає доступу до цієї сторінки' })
          return
        }
        await this.propertyDAL.archive(id, payload)
        res.send({ success: true })
      } else {
        // No record
        res.status(404).send({ success: false, error: `Запису #${id} не існує` })
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
      await this.propertyDAL.saveToFavorites(propertyID, userID)
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
      await this.propertyDAL.removeFromFavorites(propertyID, userID)
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
      const { records, pagination } = await this.propertyDAL.getFavorites(userID, currentPage, perPage)
      res.send({ favorites: records, pagination })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error: error.message })
    }
  }
}

module.exports = PropertyService
