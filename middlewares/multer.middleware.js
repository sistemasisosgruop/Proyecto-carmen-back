const multer = require('multer')

const multerRoomsPhotos = multer({
  limits: {
    fileSize: 1048576, // 1 Mb
  },
  fileFilter: (request, file, cb) => {

    request.on('aborted', () => {
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
  }
})

const multerToursPhotos= multer({
  limits: {
    fileSize: 1048576, // 1 Mb
  },
  fileFilter: (request, file, cb) => {

    request.on('aborted', () => {
      file.stream.on('end', () => {
        cb(new Error('Cancel Photo Upload'), false)
      })
      file.stream.emit('end')
    })
    if (file.mimetype == 'application/pdf') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only application/pdf format allowed!'))
    }
  }
})

module.exports = {
    multerRoomsPhotos,
    multerToursPhotos
}