const { BadRequest } = require('http-errors')
const multer = require('multer')
const path = require('path')

const tmpDir = path.join(__dirname, '../', 'tmp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 16384
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(
      new BadRequest('Only images with JPEG, JPG or PNG format <= 16Mb'),
      false
    )
  }
}

const upload = multer({
  storage: uploadConfig,
  fileFilter
})

module.exports = upload
