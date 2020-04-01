const { attributes } = require('structure')
const APP_URL = process.env.APP_URL

const Photo = attributes({
  id: {
    type: Number
  },
  propertyID: Number,
  filePath: {
    type: String,
    required: true
  }
})(class Photo {
  getURL () {
    return `${APP_URL}${this.filePath}`
  }
})

module.exports = Photo
