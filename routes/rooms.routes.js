const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const { postRoom } = require('../controllers/rooms.controllers')

router.post('/', passport.authenticate('jwt', {session: false}) , postRoom)

module.exports = router
