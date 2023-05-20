const express = require('express')
const router = express.Router()
const passport = require('passport')
const { multerPhotos } = require('../middlewares/multer.middleware')
require('../middlewares/auth.middleware')(passport)

const { postRoom, getAllRooms, getRoom } = require('../controllers/rooms.controllers')


router.get('/', passport.authenticate('jwt', { session: false }), getAllRooms)
router.post('/', passport.authenticate('jwt', {session: false}) , multerPhotos.array('image', 10), postRoom)

router.get('/:roomId', passport.authenticate('jwt', { session: false }), getRoom)




module.exports = router
