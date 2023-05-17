const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const { postRoom, getAllRooms, getRoom } = require('../controllers/rooms.controllers')


router.get('/', passport.authenticate('jwt', { session: false }), getAllRooms)
router.post('/', passport.authenticate('jwt', {session: false}) , postRoom)

router.get('/:roomId', passport.authenticate('jwt', { session: false }), getRoom)




module.exports = router
