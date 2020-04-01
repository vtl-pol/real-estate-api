const { attributes } = require('structure')
const APP_URL = process.env.APP_URL

const Photo = attributes({
  id: {
    type: Number
  },
  propertyID: Number,
  filePath: {
    type: String
  },
  fileURL: {
    type: String,
    default: (inst) => inst.filePath ? `${APP_URL}/${inst.filePath.replace('public/', '')}` : ''
  }
})(class Photo {})

module.exports = Photo
