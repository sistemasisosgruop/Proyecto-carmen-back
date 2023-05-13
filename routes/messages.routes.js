const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const { postMessage } = require('../controllers/messages.controllers')

router.post('/:id', passport.authenticate('jwt', { session: false }), postMessage)

module.exports = router