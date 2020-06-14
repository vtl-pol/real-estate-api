const { attributes } = require('structure')
const moment = require('moment')

const { Phone } = require('./phone')

class PhonesCollection extends Array { }

const Contact = attributes({
  id: {
    type: Number,
    default: null
  },
  name: String,
  birthday: Date,
  phones: {
    type: PhonesCollection,
    itemType: Phone
  },
  contactableID: Number,
  contactableType: String,

  createdAt: Date,
  updatedAt: Date
})(class Contact {
  get birthday () {
    return moment(this.get('birthday')).format('DD-MM-YYYY')
  }

  set birthday (newBirthday) {
    return this.set('birthday', moment(newBirthday, 'DD-MM-YYYY').format())
  }

  setContactable (id, type) {
    this.set('contactableID', id)
    this.set('contactableType', type)
  }
})

module.exports = Contact
