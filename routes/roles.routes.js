const express = require('express')
const passport = require('passport')
const RolesController = require('../controllers/roles.controllers')

require('../libs/passport')(passport)

const roleController = new RolesController()

const router = express.Router()

router.get('/', roleController.getRoles)
router.post('/', roleController.postRole)

router.get('/:roleId', roleController.getRoleById)
router.patch('/:roleId', roleController.patchRole)
router.delete('/:roleId', roleController.deleteRole)

module.exports = router
