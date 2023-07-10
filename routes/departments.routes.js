const express = require('express')
const passport = require('passport')
const { multerPhotos } = require('../middlewares/multer.middleware')
require('../libs/passport')(passport)

const DepartmentsControllers = require('../controllers/departments.controllers')
const RoleAuth = require('../middlewares/auth.middleware')
const ReservationsControllers = require('../controllers/reservations.controllers')
const ImagesController = require('../controllers/images.controllers')
const departmentController = new DepartmentsControllers()
const roleAuth = new RoleAuth()
const imageController = new ImagesController()
const reservationController = new ReservationsControllers()

const router = express.Router()

router.get('/', departmentController.getAllDepartments)

router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  departmentController.postDepartment
)

router.get('/:departmentId', departmentController.getDepartment)

router.delete(
  '/:departmentId',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  departmentController.deleteDepartment
)

router.post(
  '/:departmentId/images',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  multerPhotos.array('image', 10),
  imageController.uploadImagesDepartment
)

router.post(
  '/rooms/:roomId/images',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  multerPhotos.array('image', 10),
  imageController.uploadImagesDepartmentRooms
)
router.post(
  '/:departmentId/rating',
  passport.authenticate('jwt', { session: false }),
  departmentController.postDepartmentRating
)
router.get('/:departmentId/rating', departmentController.getRatingsByDepartment)

router.post(
  '/:departmentId/reservation',
  passport.authenticate('jwt', { session: false }),
  reservationController.postDepartmentReservation
)

module.exports = router
