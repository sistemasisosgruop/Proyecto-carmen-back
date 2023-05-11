const express = require('express')
const routes = express.Router()
const { postLogin, postRecoveryToken, patchPassword } = require('./auth.controllers')


routes.post('/login', postLogin)
routes.post('/recovery-password', postRecoveryToken)
routes.patch('/recovery-password/:id', patchPassword)


module.exports = routes