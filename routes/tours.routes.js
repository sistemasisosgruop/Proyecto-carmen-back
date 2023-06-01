const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const { multerPhotos } = require('../middlewares/multer.middleware')
const ToursController = require('../controllers/tours.controllers')

const tourController = new ToursController() 


router.get('/', tourController.getAllTours)
router.post('/', passport.authenticate('jwt', { session: false }), multerPhotos.array('image', 10), tourController.postTour)

router.get('/:tourId', tourController.getTour)
router.delete('/:tourId', passport.authenticate('jwt', { session: false }), tourController.deleteTour)

router.post('/:tourId/rating', passport.authenticate('jwt', { session: false }), tourController.postTourRating)
router.get('/:tourId/rating', tourController.getRatingsByTour)

module.exports = router
