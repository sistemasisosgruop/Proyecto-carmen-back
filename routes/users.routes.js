const express = require('express')
const router = express.Router()

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controllers')

router.get('/', getUsers)
router.post('/', addUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

module.exports = router
