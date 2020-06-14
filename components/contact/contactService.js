class ContactService {
  constructor (contactDAL) {
    this.contactDAL = contactDAL
  }

  async list (req, res) {
    const currentPage = (req.page || 1)
    const perPage = (req.perPage || 16)
    const contacts = await this.contactDAL.load({
      currentPage,
      perPage
    })

    res.send(contacts)
  }

  async create (req, res) {
    const payload = req.body
    try {
      const contact = await this.contactDAL.create(payload)

      res.send({ success: true, contact })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error })
    }
  }

  async update (req, res) {
    const payload = req.body
    try {
      const contact = await this.contactDAL.update(req.params.id, payload)

      res.send({ success: true, contact })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, error })
    }
  }

  async search (req, res) {
    try {
      const isPhone = /^[^a-zA-Zа-яА-ЯіїьЄє]*$/
      const query = req.query.q
      if (isPhone.test(query)) {
        const contacts = await this.contactDAL.searchByPhone(query)
        res.send({ contacts })
      } else {
        const contacts = await this.contactDAL.searchByName(query)
        res.send({ contacts })
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
}

module.exports = ContactService
