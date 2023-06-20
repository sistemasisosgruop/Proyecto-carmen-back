const express = require('express')
const passport = require('passport')
const { multerPhotos } = require('../middlewares/multer.middleware')
require('../libs/passport')(passport)

const RoomsControllers = require('../controllers/rooms.controllers')
const RoleAuth = require('../middlewares/auth.middleware')
const ReservationsControllers = require('../controllers/reservations.controllers')
const RoomImagesController = require('../controllers/roomImages.controllers')
const roomController = new RoomsControllers()
const roleAuth = new RoleAuth()
const imageController = new RoomImagesController()
const reservationController = new ReservationsControllers()

const router = express.Router()

router.get('/', roomController.getAllRooms)

router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  roomController.postRoom
)

router.get('/:roomId', roomController.getRoom)

router.delete(
  '/:roomId',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  roomController.deleteRoom
)

router.post(
  '/:roomId/images',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  multerPhotos.array('image', 10),
  imageController.uploadImageRoom
)

router.post(
  '/:roomId/rating',
  passport.authenticate('jwt', { session: false }),
  roomController.postRoomRating
)
router.get('/:roomId/rating', roomController.getRatingsByRoom)

router.post(
  '/:roomId/reservation',
  passport.authenticate('jwt', { session: false }),
  reservationController.postRoomReservation
)

module.exports = router
