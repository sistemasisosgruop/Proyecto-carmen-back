const express = require('express')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const ReservationControllers = require('../controllers/reservations.controllers') 
const reservationController = new ReservationControllers()

const router = express.Router()

router.get('/myRoomReservations', passport.authenticate('jwt', {session: false}), reservationController.getReservationsByUser)

router.get('/:reservationId', passport.authenticate('jwt', {session: false}), reservationController.getReservationRoomById)
router.patch('/:reservationId', passport.authenticate('jwt', {session: false}), reservationController.patchReservation)
router.delete('/:reservationId', passport.authenticate('jwt', {session: false}), reservationController.deleteReservation)

module.exports = router