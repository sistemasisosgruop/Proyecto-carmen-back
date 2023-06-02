const express = require('express')
const passport = require('passport')
const ReservationControllers = require('../controllers/reservations.controllers') 

const reservationController = new ReservationControllers()

const router = express.Router()

module.exports = router