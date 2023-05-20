const multer = require('multer')

const multerPhotos = multer({
  limits: {
    fileSize: 1048576, // 1 Mb
  },
  fileFilter: (req, file, cb) => {
    req.on('aborted', () => {
      file.stream.on('end', () => {
        cb(new Error('Cancel Photo Upload'), false)
      })
      file.stream.emit('end')
    })
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      // Genera un nombre de archivo único para evitar conflictos
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()
      cb(null, fileName)
    }
  })
})

module.exports = {
  multerPhotos
}
