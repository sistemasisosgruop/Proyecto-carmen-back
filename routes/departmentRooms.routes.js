const express = require('express')
const passport = require('passport')
require('../libs/passport')(passport)

const DepartmentsControllers = require('../controllers/departments.controllers')
const RoleAuth = require('../middlewares/auth.middleware')

const departmentController = new DepartmentsControllers()
const roleAuth = new RoleAuth()

const router = express.Router()

router.patch(
  '/:roomId',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  departmentController.patchRoom
)

module.exports = router
