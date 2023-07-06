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
  '/:departmentReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.getDepartmentReservationById
)
router.patch(
  '/:departmentReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.patchDepartmentReservation
)

router.delete(
  '/:departmentReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.deleteDepartmentReservation
)

router.get(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.getTourReservationById
)
router.patch(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.patchTourReservation
)
router.delete(
  '/:tourReservationId',
  passport.authenticate('jwt', { session: false }),
  reservationController.deleteTourReservation
)

module.exports = router
