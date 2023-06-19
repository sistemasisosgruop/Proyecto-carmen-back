const express = require('express')
const passport = require('passport')
require('../libs/passport')(passport)

const ReservationControllers = require('../controllers/reservations.controllers')
const reservationController = new ReservationControllers()

const router = express.Router()

router.get(
  '/myReservations',
  passport.authenticate('jwt', { session: false }),
  reservationController.getReservationsByUser
)

router.get(
  '/:roomReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.getRoomReservationById
)
router.patch(
  '/:roomReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.patchRoomReservation
)
router.delete(
  '/:roomReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.deleteRoomReservation
)

router.get(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.getRoomReservationById
)
router.patch(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.patchRoomReservation
)
router.delete(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.deleteRoomReservation
)

module.exports = router
