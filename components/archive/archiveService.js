class ArchiveService {
  constructor (archiveDAL, archiveResource) {
    this.archiveResource = archiveResource
    this.archiveDAL = archiveDAL
    this.archiveDAL.setArchiveMode()
  }

  async archivedList (req, res) {
    try {
      const filter = req.query.filter || {}
      const currentPage = req.query.page || 1
      const perPage = 10
      const { records, pagination } = await this.archiveDAL.filterAndLoad({ filter, currentPage, perPage })

      res.send({
        success: true,
        properties: records.map(h => {
          h.restrictFor(req.user)
          return this.archiveResource.archive(h)
        }),
        pagination
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        success: false,
        error: error.message
      })
    }
  }

  async archivedItem (req, res) {
    try {
      const item = await this.archiveDAL.find(req.params.id)
      if (item === null) {
        return res.status(404).send({ success: false, error: 'Об`єкту не існує' })
      }
      item.restrictFor(req.user)
      res.send({ success: true, item: this.archiveResource.archive(item) })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        success: false,
        error: error.message
      })
    }
  }

  async restoreItem (req, res) {
    try {
      const result = await this.archiveDAL.restoreFromArchive(req.params.id)
      if (result > 0) {
        res.send({ success: true })
      } else {
        res.status(404).send({ success: false, error: 'Об`єкту не існує' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).send({
        success: false,
        error: error.message
      })
    }
  }

  async deleteItem (req, res) {
    try {
      const result = await this.archiveDAL.delete(req.params.id)
      if (result > 0) {
        res.send({ success: true })
      } else {
        res.status(404).send({ success: false, error: `Запису #${req.params.id} не існує` })
      }
    } catch (error) {
      console.error(error)
      res.status(500).send({
        success: false,
        error: error.message
      })
    }
  }
}

module.exports = ArchiveService
