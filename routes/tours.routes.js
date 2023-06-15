const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const { multerPhotos } = require('../middlewares/multer.middleware')
const ToursController = require('../controllers/tours.controllers')
const TourImagesController = require('../controllers/tourImages.controllers')
const ReservationsController = require('../controllers/reservations.controllers')

const tourController = new ToursController()
const imageController = new TourImagesController()
const reservationController = new ReservationsController()

router.get('/', tourController.getAllTours)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  tourController.postTour
)

router.get('/:tourId', tourController.getTour)
router.delete(
  '/:tourId',
  passport.authenticate('jwt', { session: false }),
  tourController.deleteTour
)
router.patch(
  '/:tourId',
  passport.authenticate('jwt', { session: false }),
  tourController.updateTour
)

router.post(
  '/:tourId/images',
  passport.authenticate('jwt', { session: false }),
  multerPhotos.array('image', 10),
  imageController.uploadImageTour
)

router.post(
  '/:tourId/rating',
  passport.authenticate('jwt', { session: false }),
  tourController.postTourRating
)
router.get('/:tourId/rating', tourController.getRatingsByTour)

router.post(
  '/:tourId/reservation',
  passport.authenticate('jwt', { session: false }),
  reservationController.postTourReservation
)

module.exports = router
