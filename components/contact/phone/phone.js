const { attributes } = require('structure')
const phoneFormatter = require('phone-formatter')

const Phone = attributes({
  id: {
    type: Number,
    default: null
  },
  phone: String,
  isOnViber: {
    type: Boolean,
    default: false
  },
  isOnTelegram: {
    type: Boolean,
    default: false
  },
  isOnFacebook: {
    type: Boolean,
    default: false
  },
  isOnWhatsapp: {
    type: Boolean,
    default: false
  }
})(class Phone {
  get phone () {
    return phoneFormatter.format(this.get('phone').toString(), '(NNN) NNN NNNN')
  }

  set phone (newPhone) {
    return this.set('phone', phoneFormatter.normalize(newPhone.toString()))
  }
})

module.exports = Phone
