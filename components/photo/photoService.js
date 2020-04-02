const photoDAL = require('./photoDAL')
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
    upload(req, res, async (error) => {
      if (error) {
        const result = {
          success: false,
          error
        }
        callback(result)
      }
      for (const file of req.files) {
        const result = await this.createPhoto(file, req.params.id)
        if (result.error) {
          // It's a false positive.
          // We are in control of a filename in here and it can't be set by a user input
          /* eslint-disable security/detect-non-literal-fs-filename */
          fs.unlinkSync(`./public/images/properties/${file.filename}`)
          callback(result)
          return
        }
      }
      const result = {
        success: true,
        photos: req.files.map(f => `${process.env.APP_URL}/${f.path.replace('public/', '')}`),
        error: null
      }
      callback(result)
    })
  }

  async createPhoto (file, propertyID) {
    try {
      const photo = await photoDAL.create({ filePath: file.path, propertyID })
      return { photo }
    } catch (e) {
      console.error(e)
      return { error: [file.originalname, e.message] }
    }
  }
}

module.exports = new PhotoService()
