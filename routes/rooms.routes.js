const express = require('express')
const passport = require('passport')
const { multerPhotos } = require('../middlewares/multer.middleware')
require('../middlewares/auth.middleware')(passport)

const RoomsControllers = require('../controllers/rooms.controllers')
const ReservationsControllers = require('../controllers/reservations.controllers')
const ImagesController = require('../controllers/images.controllers')
const roomController = new RoomsControllers()
const imageController = new ImagesController()
const reservationController = new ReservationsControllers()

const router = express.Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.getAllRooms
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.postRoom
)

router.get(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  roomController.getRoom
)
router.delete(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  roomController.deleteRoom
)

router.post(
  '/:roomId/images',
  passport.authenticate('jwt', { session: false }),
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
