const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const ToursController = require('../controllers/tours.controllers')

const tourController = new ToursController() 


router.get('/', tourController.getAllTours)
router.get('/:tourId', tourController.getTour)

router.post('/', passport.authenticate('jwt', { session: false }), tourController.postTour)

module.exports = router
