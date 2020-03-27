const Photo = require('./photo')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/images/properties/')
  },
  filename: (req, file, cb) => {
    let fileName = `property-${req.params.id}`
    let err = null
    switch (file.mimetype) {
      case 'image/gif':
        fileName += `-${Date.now()}.gif`
        break
      case 'image/png':
        fileName += `-${Date.now()}.png`
        break
      case 'image/jpeg':
        fileName += `-${Date.now()}.jpg`
        break
      default:
        fileName = null
        err = 'Невірний тип файлу! Підтримуються типи gif, png, jpg'
        break
    }
    cb(err, fileName)
  }
})
const upload = multer({ storage }).array('photos')

class PhotoService {
  async uploadPhotos (req, res, callback) {
    upload(req, res, (error) => {
      if (error) {
        const result = {
          success: false,
          error
        }
        callback(result)
      }
      req.files.forEach(file => {
        this.createPhoto(file, req.params.id)
      })
      const result = {
        success: true,
        photos: req.files.map(f => `${process.env.APP_URL}/${f.path.replace('public/', '')}`),
        error: null
      }
      callback(result)
    })
  }

  async createPhoto (file, propertyId) {
    try {
      const id = await Photo.create({ filePath: file.path, propertyId })
      const photo = await Photo.find(id)
      return { photo }
    } catch (e) {
      console.error(e)
      fs.unlinkSync(`./${file.path}`)
      return { error: [file.originalname, e.message] }
    }
  }
}

module.exports = new PhotoService()
