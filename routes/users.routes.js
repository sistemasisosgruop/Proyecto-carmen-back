const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/users.controllers')

const userController = new UsersController()

router.get('/', userController.getUsers)
router.post('/', userController.addUser)

router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
